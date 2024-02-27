import { PUZZLE_CREATION_LIMIT } from '@infinity-keys/constants'
import { SiteRole } from '@prisma/client'
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
  getOptionalNftUpdateValues,
} from 'src/lib/puzzleForm'
import { getNftData } from 'src/lib/web3/get-nft-data'

cloudinary.config({
  secure: true,
})

export const editBurdPuzzle: MutationResolvers['editBurdPuzzle'] = async ({
  input,
  rewardableId,
  puzzleId,
}) => {
  try {
    if (!context.currentUser?.id) {
      throw new AuthenticationError('Must be logged in')
    }

    if (!hasRole([SiteRole.ADMIN, SiteRole.CREATOR_TOOLS_TESTER])) {
      throw new ForbiddenError('You are not authorized to create a rewardable')
    }

    if (!input.puzzle) {
      throw new Error('Puzzle is required in `editBurdPuzzle` request.')
    }

    if (!input.puzzle.steps) {
      throw new Error('Steps are required in `editBurdPuzzle` request.')
    }

    const prevRewardable = await db.rewardable.findUnique({
      where: { id: rewardableId },
      select: { name: true, slug: true },
    })

    const steps = formatCreateSteps(input.puzzle.steps)
    const slug =
      prevRewardable?.name === input.name
        ? prevRewardable.slug
        : generateSlug(input.name)

    // Handle optional Cloudinary upload
    const nftUpdateData = await getOptionalNftUpdateValues({
      newName: input.nft.name,
      newImage: input.nft.image ?? undefined,
      slug,
      rewardableId,
    })

    const deleteStepPagesOperation = db.stepPage.deleteMany({
      where: { step: { puzzleId } },
    })

    const deleteStepSimpleTextOperation = db.stepSimpleText.deleteMany({
      where: { step: { puzzleId } },
    })

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
        // @NOTE: hardcoded to `false` during testing
        listPublicly: false,
        // listPublicly: input.listPublicly,
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
        ...(nftUpdateData
          ? {
              nfts: {
                // @NOTE: Rewardables can have multiple NFTs, but currently we only
                // support one. Be sure to update this if that changes.
                updateMany: {
                  where: {},
                  data: nftUpdateData,
                },
              },
            }
          : {}),
      },
    })

    // Get the rewardable that's returned after all transactions succeed
    const [, , , rewardable] = await db.$transaction([
      deleteStepPagesOperation,
      deleteStepSimpleTextOperation,
      deleteStepsOperation,
      updateRewardable,
    ])

    return {
      rewardable,
      success: true,
    }
  } catch (error) {
    logger.error('Error in `editBurdPuzzle`', error)

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

// Richard Burd's unique service:
// Eventually this becomes "create rewardable"

export const createBurdPuzzle: MutationResolvers['createBurdPuzzle'] = async ({
  input,
}) => {
  try {
    if (!context.currentUser?.id) {
      throw new AuthenticationError('Must be logged in')
    }

    if (!hasRole([SiteRole.ADMIN, SiteRole.CREATOR_TOOLS_TESTER])) {
      throw new ForbiddenError('You are not authorized to create a rewardable')
    }

    if (!input.puzzle) {
      throw new Error('Puzzle is required in `createBurdPuzzle` request.')
    }

    if (!input.puzzle.steps) {
      throw new Error('Steps are required in `createBurdPuzzle` request.')
    }

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

    const result = await cloudinary.uploader.upload(input.nft.image, {
      use_filename: false,
      unique_filename: true,
      folder: 'ik-alpha-creators',
    })

    if (!result.public_id) {
      throw new Error('There was a problem uploading NFT image to Cloudinary')
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
        // @NOTE: hardcoded to `false` during testing
        listPublicly: false,
        // listPublicly: input.listPublicly,
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
            cloudinaryId: result.public_id,
            data: {
              name: input.nft.name,
              image: generateNftImage(result.public_id),
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
    logger.error('Error in `createBurdPuzzle`', error)

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
