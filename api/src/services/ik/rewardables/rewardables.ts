import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import type { QueryResolvers, MutationResolvers, StepType } from 'types/graphql'

import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { addNftReward as addReward } from 'src/lib/nft'

export const addNftReward: MutationResolvers['addNftReward'] = ({ id }) => {
  return addReward(id)
}

export const rewardableBySlug: QueryResolvers['rewardableBySlug'] = ({
  slug,
  type,
}) => {
  return db.rewardable.findUnique({
    where: {
      slug_type: {
        slug,
        type,
      },
    },
  })
}

export const rewardablesBySortType: QueryResolvers['rewardablesBySortType'] = ({
  sortType,
}) => {
  if (!sortType) return []
  return db.rewardable.findMany({
    where: {
      sortType,
      listPublicly: true,
    },
  })
}

export const rewardablesCollection: QueryResolvers['rewardablesCollection'] =
  async ({ types, page = 1, count = 16 }) => {
    if (!page || !count) {
      throw new Error('Missing pagination info')
    }

    const skip = (page - 1) * count
    const [smallestPaginationCount] = PAGINATION_COUNTS
    const take = PAGINATION_COUNTS.includes(count)
      ? count
      : smallestPaginationCount

    const typesFilter = types.map((type) => ({ type, listPublicly: true }))
    const totalCount = await db.rewardable.count({
      where: { OR: typesFilter },
    })

    // Signals to Redwood to render the `Empty` component
    if (totalCount === 0) return null

    return {
      rewardables: await db.rewardable.findMany({
        where: { OR: typesFilter },
        take,
        skip,
        orderBy: { sortWeight: 'asc' },
      }),
      totalCount,
    }
  }

// @TODO: what is this return type?
export const rewardableClaim = ({ id }: { id: string }) => {
  if (!context?.currentUser?.id) {
    throw new Error('Not logged in')
  }
  return db.rewardable.findUnique({
    where: { id },
    select: {
      type: true,
      nfts: {
        select: {
          id: true,
          tokenId: true,
        },
      },
      userRewards: {
        where: { userId: context.currentUser.id },
        select: {
          id: true,
          nfts: {
            select: {
              id: true,
            },
          },
        },
      },
      asParent: {
        select: {
          childRewardable: {
            select: {
              userRewards: {
                where: { userId: context.currentUser.id },
                select: {
                  id: true,
                },
              },
              nfts: {
                select: {
                  tokenId: true,
                },
              },
            },
          },
        },
      },
    },
  })
}

/**
 * All Steps solved by the current user
 */
export const userProgress: QueryResolvers['userProgress'] = () => {
  if (!context?.currentUser?.id) {
    throw new Error('No current user')
  }
  return db.step.findMany({
    select: { id: true, puzzleId: true, stepSortWeight: true },
    orderBy: { stepSortWeight: 'asc' },
    where: {
      attempts: {
        some: {
          userId: context.currentUser.id,
          solve: {
            userId: context.currentUser.id,
          },
        },
      },
    },
  })
}

// // Richard Burd's unique service:
// // Eventually this becomes "create rewardable"
// export const createBurdPuzzle: MutationResolvers['createBurdPuzzle'] = async ({
//   input,
// }) => {
//   if (!input.puzzle) {
//     throw new Error('No puzzle')
//   }

//   if (!input.puzzle.steps) {
//     throw new Error('No steps')
//   }

//   const steps = input.puzzle.steps.map((step) => {
//     if (step.type === 'SIMPLE_TEXT' && step.stepSimpleText) {
//       return {
//         failMessage: step.failMessage,
//         successMessage: step.successMessage,
//         stepSortWeight: step.stepSortWeight,
//         type: 'SIMPLE_TEXT',
//         stepSimpleText: {
//           create: {
//             solution: step.stepSimpleText.solution,
//           },
//         },
//       }
//     }
//     throw new Error(`Step type ${step.type} not implemented yet`)
//   })

//   const rewardable = await db.rewardable.create({
//     data: {
//       name: input.name,
//       explanation: input.explanation,
//       type: input.type,
//       slug: input.slug,
//       listPublicly: input.listPublicly,
//       orgId: 'cla9yay7y003k08la2z4j2xrv',
//       puzzle: {
//         create: {
//           isAnon: input.puzzle.isAnon,
//           steps: {
//             create: steps,
//           },
//         },
//       },
//     },
//   })
//   // const rewardable = await db.rewardable.create({
//   //   data: {
//   //     name: input.rewardable.name,
//   //     explanation: input.rewardable.explanation,
//   //     type: input.rewardable.type,
//   //     organization: {
//   //       connect: {
//   //         id: input.rewardable.orgId,
//   //       },
//   //     },
//   //     slug: input.rewardable.slug,
//   //     listPublicly: input.rewardable.listPublicly,
//   //     puzzle: {
//   //       create: {
//   //         isAnon: input.puzzle.isAnon,
//   //         steps: {
//   //           create: input.puzzle.steps.map((step) => ({
//   //             type: step.type,
//   //             failMessage: step.failMessage,
//   //             stepSortWeight: step.stepSortWeight,
//   //           })),
//   //         },
//   //       },
//   //     },
//   //   },
//   // })
//   return rewardable
// }

// @TODO: move to lookups
const stepTypeLookup: {
  [key in StepType]: string
} = {
  SIMPLE_TEXT: 'stepSimpleText',
  NFT_CHECK: 'stepNftCheck',
  FUNCTION_CALL: 'stepFunctionCall',
  COMETH_API: 'stepComethApi',
  TOKEN_ID_RANGE: 'stepTokenIdRange',
  ORIUM_API: 'stepOriumApi',
  ASSET_TRANSFER: 'stepAssetTransfer',
  ERC20_BALANCE: 'stepErc20Balance',
  LENS_API: 'stepLensApi',
}

export const createRewardablesStepsNfts: MutationResolvers['createRewardablesStepsNfts'] =
  async ({ input }) => {
    if (input.type === 'PACK') {
      const { nft, ...rest } = input

      const { id } = await db.rewardable.create({
        data: {
          ...rest,
          organization: {
            connect: {
              id: 'cla9yay7y003k08la2z4j2xrv',
            },
          },
          ...(nft?.contractName
            ? {
                nfts: {
                  create: [nft],
                },
              }
            : {}),
        },
      })

      return { id }
    }

    if (input.type === 'PUZZLE') {
      const { nft, steps, rewardableConnection, ...rest } = input

      const formattedSteps = steps.map((step) => {
        const { stepTypeData, ...rest } = step

        return {
          ...rest,
          [stepTypeLookup[step.type]]: {
            create: stepTypeData[stepTypeLookup[step.type]],
          },
        }
      })

      const { id } = await db.rewardable.create({
        data: {
          ...rest,
          organization: {
            connect: {
              id: 'cla9yay7y003k08la2z4j2xrv',
            },
          },
          puzzle: {
            create: {
              steps: {
                create: formattedSteps,
              },
            },
          },
          ...(nft?.contractName
            ? {
                nfts: {
                  create: [nft],
                },
              }
            : {}),
          ...(rewardableConnection?.parentId
            ? {
                asChild: {
                  create: rewardableConnection,
                },
              }
            : {}),
        },
      })

      return { id }
    }
  }
