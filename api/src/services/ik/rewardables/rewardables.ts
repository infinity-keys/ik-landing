import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import type { QueryResolvers, MutationResolvers, StepType } from 'types/graphql'

import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

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
export const rewardableClaim = ({ id }) => {
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
