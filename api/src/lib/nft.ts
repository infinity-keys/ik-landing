import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from './db'

export const addNftReward = async (id: string) => {
  if (!context.currentUser) {
    throw new AuthenticationError('Must be logged in')
  }

  const rewardable = await db.rewardable.findUnique({
    where: { id },
    select: {
      type: true,
      userRewards: {
        where: { userId: context.currentUser.id },
        select: {
          id: true,
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

  if (!rewardable) {
    throw new Error('No rewardable found for this id.')
  }

  const isPack = rewardable.type === 'PACK'

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
