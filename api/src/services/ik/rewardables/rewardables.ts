import { PAGINATION_COUNTS } from '@infinity-keys/constants'
import type { QueryResolvers } from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'

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

export const rewardablesCollection: QueryResolvers['rewardablesCollection'] =
  async ({ type, page = 1, count = 16 }) => {
    const skip = (page - 1) * count
    const [smallestPaginationCount] = PAGINATION_COUNTS
    const take = PAGINATION_COUNTS.includes(count)
      ? count
      : smallestPaginationCount

    return {
      rewardables: await db.rewardable.findMany({
        where: { type, listPublicly: true },
        take,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      totalCount: await db.rewardable.count({
        where: { type, listPublicly: true },
      }),
    }
  }

// @TODO: what is this return type?
export const rewardableClaim = ({ id }) => {
  return db.rewardable.findUnique({
    where: { id },
    select: {
      nfts: {
        select: {
          tokenId: true,
        },
      },
      userRewards: {
        select: {
          id: true,
        },
      },
      asParent: {
        select: {
          childRewardable: {
            select: {
              userRewards: {
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

export const addNftReward = async ({ id }) => {
  const rewardable = await db.rewardable.findUnique({
    where: { id },
    select: {
      userRewards: {
        select: {
          id: true,
        },
      },
      asParent: {
        select: {
          childRewardable: {
            select: {
              userRewards: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      nfts: {
        select: {
          id: true,
        },
      },
    },
  })

  const isPack = rewardable.asParent.length > 0

  if (isPack) {
    const allPuzzlesSolved = rewardable.asParent.every(
      ({ childRewardable }) => childRewardable.userRewards.length > 0
    )

    if (!allPuzzlesSolved) {
      throw new ForbiddenError('You have not solved all the associated puzzles')
    }
  }

  return db.userReward.update({
    where: {
      userId_rewardableId: {
        userId: context.currentUser.id,
        rewardableId: id,
      },
    },
    data: {
      nfts: {
        connect: {
          id: rewardable.nfts[0].id,
        },
      },
    },
  })
}
