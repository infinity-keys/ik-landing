import { PUZZLE_CREATION_LIMIT } from '@infinity-keys/constants'
import { v2 as cloudinary } from 'cloudinary'
import { nanoid } from 'nanoid'
import type { MutationResolvers } from 'types/graphql'

import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import {
  formatCreateSteps,
  generateNftDescription,
  generateNftImage,
  generateSlug,
  isAlphanumeric,
} from 'src/lib/puzzleForm'
import { getNftData } from 'src/lib/web3/get-nft-data'

cloudinary.config({
  secure: true,
})

export const editRewardablePuzzle: MutationResolvers['editRewardablePuzzle'] =
  async ({ input, rewardableId, puzzleId }) => {
    try {
      if (!context.currentUser?.id) {
        throw new AuthenticationError('Must be logged in')
      }

      if (!input.puzzle) {
        throw new Error('Puzzle is required in `editRewardablePuzzle` request.')
      }

      if (!input.puzzle.steps) {
        throw new Error('Steps are required in `editRewardablePuzzle` request.')
      }

      input.puzzle.steps.forEach((step) => {
        if (!isAlphanumeric(step.stepSimpleText?.solution)) {
          throw new Error(
            'Invalid passcode - must have letters and numbers only'
          )
        }
      })

      const prevRewardable = await db.rewardable.findUnique({
        where: { id: rewardableId },
        select: { name: true, slug: true, trashedAt: true },
      })

      if (prevRewardable?.trashedAt) {
        throw new Error("Cannot edit a puzzle that's in the trash")
      }

      const steps = formatCreateSteps(input.puzzle.steps)
      const slug =
        prevRewardable?.name === input.name
          ? prevRewardable.slug
          : generateSlug(input.name)

      const deleteStepsOperation = db.step.deleteMany({
        where: { puzzleId },
      })

      const updateRewardable = db.rewardable.update({
        where: {
          id: rewardableId,
        },
        data: {
          name: input.name,
          // @NOTE: `explanation` is only used with packs
          // explanation: input.explanation,
          type: input.type,
          slug,
          listPublicly: input.listPublicly,
          successMessage: input.successMessage,
          puzzle: {
            update: {
              coverImage: input.puzzle.coverImage,
              requirements: input.puzzle.requirements.flatMap(
                (requirement) => requirement ?? []
              ),
              steps: {
                create: steps,
              },
            },
          },
          nfts: {
            // @NOTE: Rewardables can have multiple NFTs, but currently we only
            // support one. Be sure to update this if that changes.
            updateMany: {
              where: {},
              data: {
                cloudinaryId: input.nft.image,
                data: {
                  name: input.nft.name,
                  image: generateNftImage(input.nft.image),
                  description: generateNftDescription({
                    slug,
                    name: input.nft.name,
                  }),
                  external_url: `https://www.infinitykeys.io/puzzle/${slug}`,
                },
              },
            },
          },
        },
      })

      // Get the rewardable that's returned after all transactions succeed
      const [, rewardable] = await db.$transaction([
        deleteStepsOperation,
        updateRewardable,
      ])

      return {
        rewardable,
        success: true,
      }
    } catch (error) {
      logger.error('Error in `editRewardablePuzzle`', error)

      return {
        success: false,
        rewardable: null,
        errorMessage:
          error instanceof Error
            ? error.message
            : 'There was a problem editing the rewardable',
      }
    }
  }

export const createRewardablePuzzle: MutationResolvers['createRewardablePuzzle'] =
  async ({ input }) => {
    try {
      if (!context.currentUser?.id) {
        throw new AuthenticationError('Must be logged in')
      }

      if (!input.puzzle) {
        throw new Error(
          'Puzzle is required in `createRewardablePuzzle` request.'
        )
      }

      if (!input.puzzle.steps) {
        throw new Error(
          'Steps are required in `createRewardablePuzzle` request.'
        )
      }

      input.puzzle.steps.forEach((step) => {
        if (!isAlphanumeric(step.stepSimpleText?.solution)) {
          throw new Error(
            'Invalid passcode - must have letters and numbers only'
          )
        }
      })

      const steps = formatCreateSteps(input.puzzle.steps)

      let userOrgId

      const userOrg = await db.organizationUser.findFirst({
        where: {
          userId: context.currentUser.id,
        },
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          orgId: true,
        },
      })

      userOrgId = userOrg?.orgId

      if (!userOrg) {
        const placeholder = nanoid()

        const newOrg = await db.organization.create({
          data: {
            slug: placeholder,
            name: placeholder,
            users: {
              create: {
                userId: context.currentUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        })
        userOrgId = newOrg.id
      } else {
        // If user already belongs to an org, make sure that org has not reached their limit
        const numOfCreatedRewardables = await db.rewardable.count({
          where: {
            orgId: userOrgId,
          },
        })

        if (
          numOfCreatedRewardables >= PUZZLE_CREATION_LIMIT &&
          !hasRole('ADMIN')
        ) {
          throw new Error(
            'You have reached your puzzle creation limit. Please edit an existing puzzle.'
          )
        }
      }

      if (!userOrgId) {
        throw new Error('There was a problem obtaining org id')
      }

      const { tokenId, lookupId } = await getNftData()
      const slug = generateSlug(input.name)

      const rewardable = await db.rewardable.create({
        data: {
          name: input.name,
          // @NOTE: `explanation` is only used with packs
          // explanation: input.explanation,
          type: input.type,
          slug,
          listPublicly: input.listPublicly,
          successMessage: input.successMessage,
          orgId: userOrgId,
          puzzle: {
            create: {
              coverImage: input.puzzle.coverImage,
              requirements: input.puzzle.requirements.flatMap(
                (requirement) => requirement ?? []
              ),
              steps: {
                create: steps,
              },
            },
          },
          nfts: {
            create: {
              tokenId,
              lookupId,
              contractName: 'achievement',
              cloudinaryId: input.nft.image,
              data: {
                name: input.nft.name,
                image: generateNftImage(input.nft.image),
                attributes: [
                  {
                    value: 'Community',
                    trait_type: 'Category',
                  },
                ],
                description: generateNftDescription({
                  slug,
                  name: input.nft.name,
                }),
                external_url: `https://www.infinitykeys.io/puzzle/${slug}`,
              },
            },
          },
        },
      })

      if (!rewardable) {
        throw new Error('Problem creating rewardable')
      }

      return {
        rewardable,
        success: true,
      }
    } catch (error) {
      logger.error('Error in `createRewardablePuzzle`')
      logger.error(error)

      return {
        success: false,
        rewardable: null,
        errorMessage:
          error instanceof Error
            ? error.message
            : 'There was a problem creating the rewardable',
      }
    }
  }

export const trashRewardablePuzzle: MutationResolvers['trashRewardablePuzzle'] =
  async ({ rewardableId }) => {
    try {
      if (!context.currentUser?.id) {
        throw new AuthenticationError('Must be logged in')
      }

      // Ensure user owns the rewardable they are trying to trash
      try {
        await db.rewardable.findUniqueOrThrow({
          where: {
            id: rewardableId,
            organization: {
              users: {
                some: {
                  userId: context.currentUser.id,
                },
              },
            },
          },
        })
      } catch {
        throw new ForbiddenError(
          'User must belong to the org that owns this puzzle.'
        )
      }

      const rewardable = await db.rewardable.update({
        where: { id: rewardableId },
        data: {
          trashedAt: new Date(),
          listPublicly: false,
        },
      })

      return { success: true, rewardable }
    } catch (error) {
      logger.error('Error in `trashRewardablePuzzle`')
      logger.error(error)

      return {
        success: false,
        rewardable: null,
        errorMessage:
          error instanceof Error
            ? error.message
            : 'There was a problem trashing the rewardable',
      }
    }
  }

export const restoreRewardablePuzzle: MutationResolvers['restoreRewardablePuzzle'] =
  async ({ rewardableId }) => {
    try {
      if (!context.currentUser?.id) {
        throw new AuthenticationError('Must be logged in')
      }

      // Ensure user owns the rewardable they are trying to restore
      try {
        await db.rewardable.findUniqueOrThrow({
          where: {
            id: rewardableId,
            organization: {
              users: {
                some: {
                  userId: context.currentUser.id,
                },
              },
            },
          },
        })
      } catch {
        throw new ForbiddenError(
          'User must belong to the org that owns this puzzle.'
        )
      }

      const rewardable = await db.rewardable.update({
        where: { id: rewardableId },
        data: { trashedAt: null },
      })

      return { success: true, rewardable }
    } catch (error) {
      logger.error('Error in `restoreRewardablePuzzle`')
      logger.error(error)

      return {
        success: false,
        rewardable: null,
        errorMessage:
          error instanceof Error
            ? error.message
            : 'There was a problem restoring the rewardable',
      }
    }
  }
