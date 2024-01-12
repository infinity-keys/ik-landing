import { StepGuideType, StepType, SiteRole } from '@prisma/client'
import { nanoid } from 'nanoid'
import type { MutationResolvers } from 'types/graphql'

import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'

// Richard Burd's unique service:
// Eventually this becomes "create rewardable"

export const createBurdPuzzle: MutationResolvers['createBurdPuzzle'] = async ({
  input,
}) => {
  if (!input.puzzle) {
    throw new Error('No puzzle')
  }

  if (!input.puzzle.steps) {
    throw new Error('No steps')
  }

  if (!context.currentUser?.id) {
    throw new AuthenticationError('Must be logged in')
  }

  if (!hasRole(SiteRole.ADMIN)) {
    throw new ForbiddenError('Only admins can create rewardables')
  }

  const steps = input.puzzle.steps.map((step) => {
    const stepCommon = {
      solutionHint: step.solutionHint,
      defaultImage: step.defaultImage,
      solutionImage: step.solutionImage,
      stepSortWeight: step.stepSortWeight,
      // NOTE: This is temporary until we start supporting more than `SEEK`
      // stepGuideType: step.stepGuideType,
      stepGuideType: StepGuideType.SEEK,
      stepPage: {
        create: step.stepPage,
      },
    }

    if (step.type === StepType.SIMPLE_TEXT && step.stepSimpleText) {
      return {
        ...stepCommon,
        type: StepType.SIMPLE_TEXT,
        stepSimpleText: {
          create: {
            solution: step.stepSimpleText.solution,
            solutionCharCount: step.stepSimpleText.solution.length,
          },
        },
      }
    }

    // NOTE: Enable each option when we start supporting it
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
    throw new Error(`Step type ${step.type} not implemented yet`)
  })

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
  console.log(input.nft)

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
          tokenId: 100,
          contractName: 'achievement',
          cloudinaryId: 'ik-alpha-trophies/probably0-astro_hk9mnl',
          data: {
            name: input.nft.name,
            image: input.nft.image,
            attributes: [
              {
                value: 'Community',
                trait_type: 'Category',
              },
            ],
            description: `https://www.infinitykeys.io/puzzle/${input.slug}\n\nThe ${input.nft.name} IK Alpha Trophy indicates the holder has concluded the ${input.nft.name} Hunt from Infinity Keys. Players hold IK Alpha Trophies to celebrate success in the alpha playtest version of Infinity Keys, participate in community activations, access future hunts and puzzles with Infinity Keys and collaborating projects, and to prepare for an upcoming cross-metaverse gaming adventure.\n\nInfinity Keys are creator tools to build treasure hunt-style puzzles. The alpha version features free-to-play puzzles awarding IK Alpha Trophies to anyone who solves the alpha gametesing version hunts while they are available. These achievements may be used as future keys or clues to more challenging (and rewarding) hunts.\n\nSolve puzzles, collect all the trophies while you can, and find the hidden key in each NFT art. Good luck, there’s treasure everywhere.`,
            external_url: `https://www.infinitykeys.io/puzzle/${input.slug}`,
          },
        },
      },
    },
  })
  return rewardable
}
