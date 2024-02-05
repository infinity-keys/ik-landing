import { CLOUDINARY_CLOUD_NAME } from '@infinity-keys/constants'
import { StepGuideType, StepType, SiteRole } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import { buildUrl } from 'cloudinary-build-url'
import { nanoid } from 'nanoid'
import type { CreateStepInput, MutationResolvers } from 'types/graphql'

import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
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

    if (!input.puzzle || !puzzleId) {
      throw new Error('No puzzle')
    }

    if (!input.puzzle.steps) {
      throw new Error('No steps')
    }

    const steps = formatCreateSteps(input.puzzle.steps)

    const deleteStepPagesOperation = db.stepPage.deleteMany({
      where: {
        step: {
          puzzleId,
        },
      },
    })

    const deleteStepSimpleTextOperation = db.stepSimpleText.deleteMany({
      where: {
        step: {
          puzzleId,
        },
      },
    })

    const deleteStepsOperation = db.step.deleteMany({
      where: { puzzleId },
    })

    // Handle optional cloudinary upload
    const nftImage = input.nft.image
    const result =
      nftImage &&
      (await cloudinary.uploader.upload(nftImage, {
        use_filename: false,
        unique_filename: true,
        folder: 'ik-alpha-creators',
      }))

    if (nftImage && (!result || !result?.public_id)) {
      throw new Error('There was a problem uploading NFT image to Cloudinary')
    }

    let nftUpdateData

    if (input.nft.image || input.nft.name) {
      const originalNftData = await db.nft.findFirst({
        where: {
          rewardables: {
            some: {
              id: rewardableId,
            },
          },
        },
      })

      const originalMetadata = originalNftData?.data
      const nftName =
        originalMetadata &&
        typeof originalMetadata === 'object' &&
        'name' in originalMetadata &&
        originalMetadata.name

      const nftImage =
        originalMetadata &&
        typeof originalMetadata === 'object' &&
        'image' in originalMetadata &&
        originalMetadata.image

      nftUpdateData = {
        ...(result && result.public_id
          ? { cloudinaryId: result.public_id }
          : {}),

        data: {
          name: input.nft.name || nftName,
          image:
            result && result?.public_id
              ? buildUrl(result.public_id, {
                  cloud: {
                    cloudName: CLOUDINARY_CLOUD_NAME,
                  },
                  transformations: {
                    transformation: 'ik-nft-meta',
                  },
                })
              : nftImage,
          description: generateNftDescription({
            slug: input.slug,
            name: input.nft.name,
          }),
          external_url: `https://www.infinitykeys.io/puzzle/${input.slug}`,
        },
      }
    }

    const updateRewardable = db.rewardable.update({
      where: {
        id: rewardableId,
      },
      data: {
        name: input.name,
        // @NOTE: `explanation` is only used with packs
        // explanation: input.explanation,
        type: input.type,
        slug: input.slug,
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
                // support one. Be sure to update this if that changes
                updateMany: {
                  where: {},
                  data: nftUpdateData,
                },
              },
            }
          : {}),
      },
    })

    const [, , , rewardable] = await db.$transaction([
      deleteStepPagesOperation,
      deleteStepSimpleTextOperation,
      deleteStepsOperation,
      updateRewardable,
    ])

    if (!rewardable) {
      throw new Error('Problem creating rewardable')
    }

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
      throw new Error('No puzzle')
    }

    if (!input.puzzle.steps) {
      throw new Error('No steps')
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

    const rewardable = await db.rewardable.create({
      data: {
        name: input.name,
        // @NOTE: `explanation` is only used with packs
        // explanation: input.explanation,
        type: input.type,
        slug: input.slug,
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
              image: buildUrl(result.public_id, {
                cloud: {
                  cloudName: CLOUDINARY_CLOUD_NAME,
                },
                transformations: {
                  transformation: 'ik-nft-meta',
                },
              }),
              attributes: [
                {
                  value: 'Community',
                  trait_type: 'Category',
                },
              ],
              description: generateNftDescription({
                slug: input.slug,
                name: input.nft.name,
              }),
              external_url: `https://www.infinitykeys.io/puzzle/${input.slug}`,
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

const formatCreateSteps = (steps: CreateStepInput[]) => {
  const formattedSteps = steps.map(
    ({
      solutionHint,
      defaultImage,
      solutionImage,
      stepSortWeight,
      stepPage,
      type,
      stepSimpleText,
    }) => {
      const stepCommon = {
        solutionHint,
        defaultImage,
        solutionImage,
        stepSortWeight,
        // NOTE: This is temporary until we start supporting more than `SEEK`
        // stepGuideType: stepGuideType,
        stepGuideType: StepGuideType.SEEK,
        stepPage: {
          create: stepPage,
        },
      }

      if (type === StepType.SIMPLE_TEXT && stepSimpleText) {
        return {
          ...stepCommon,
          type: StepType.SIMPLE_TEXT,
          stepSimpleText: {
            create: {
              solution: stepSimpleText.solution,
              solutionCharCount: stepSimpleText.solution.length,
            },
          },
        }
      }

      // NOTE: Enable each option when we start supporting it
      {
        // if (step.type === 'NFT_CHECK' && step.stepNftCheck) {
        //   return {
        //     ...stepCommon,
        //     type: 'NFT_CHECK',
        //     stepNftCheck: {
        //       create: {
        //         requireAllNfts: step.stepNftCheck.requireAllNfts,
        //         nftCheckData: {
        //           create: step.stepNftCheck.nftCheckData.map((nftCheckDatum) => {
        //             return {
        //               contractAddress: nftCheckDatum.contractAddress,
        //               tokenId: nftCheckDatum.tokenId,
        //               chainId: nftCheckDatum.chainId,
        //               poapEventId: nftCheckDatum.poapEventId,
        //             }
        //           }),
        //         },
        //       },
        //     },
        //   }
        // }
        // if (step.type === 'FUNCTION_CALL' && step.stepFunctionCall) {
        //   return {
        //     ...stepCommon,
        //     type: 'FUNCTION_CALL',
        //     stepFunctionCall: {
        //       create: {
        //         methodIds: step.stepFunctionCall.methodIds,
        //         contractAddress: step.stepFunctionCall.contractAddress,
        //       },
        //     },
        //   }
        // }
        // if (step.type === 'COMETH_API' && step.stepComethApi) {
        //   return {
        //     ...stepCommon,
        //     type: 'COMETH_API',
        //     stepComethApi: {
        //       // No addition info currently needed for the Cometh API check
        //     },
        //   }
        // }
        // if (step.type === 'TOKEN_ID_RANGE' && step.stepTokenIdRange) {
        //   return {
        //     ...stepCommon,
        //     type: 'TOKEN_ID_RANGE',
        //     stepTokenIdRange: {
        //       create: {
        //         contractAddress: step.stepTokenIdRange.contractAddress,
        //         chainId: step.stepTokenIdRange.chainId,
        //         startIds: step.stepTokenIdRange.startIds,
        //         endIds: step.stepTokenIdRange.endIds,
        //       },
        //     },
        //   }
        // }
        // if (step.type === 'ORIUM_API' && step.stepOriumApi) {
        //   return {
        //     ...stepCommon,
        //     type: 'ORIUM_API',
        //     stepOriumApi: {
        //       create: {
        //         checkType: step.stepOriumApi.checkType,
        //       },
        //     },
        //   }
        // }
      }
      throw new Error(`Step type ${type} not implemented yet`)
    }
  )

  return formattedSteps
}

const generateNftDescription = ({
  slug,
  name,
}: {
  slug: string
  name: string
}) => {
  return `https://www.infinitykeys.io/puzzle/${slug}\n\nThe ${name} IK Alpha Trophy indicates the holder has concluded the ${name} Hunt from Infinity Keys. Players hold IK Alpha Trophies to celebrate success in the alpha playtest version of Infinity Keys, participate in community activations, access future hunts and puzzles with Infinity Keys and collaborating projects, and to prepare for an upcoming cross-metaverse gaming adventure.\n\nInfinity Keys are creator tools to build treasure hunt-style puzzles. The alpha version features free-to-play puzzles awarding IK Alpha Trophies to anyone who solves the alpha game testing version hunts while they are available. These achievements may be used as future keys or clues to more challenging (and rewarding) hunts.\n\nSolve puzzles, collect all the trophies while you can, and find the hidden key in each NFT art. Good luck, there’s treasure everywhere.`
}
