import type { Rewardable, StepType } from 'types/graphql'
import { z } from 'zod'

import { AuthenticationError, context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { createUserReward } from 'src/services/userRewards/userRewards'

const SimpleTextSolutionData = z.object({
  type: z.literal('simple-text'),
  simpleTextSolution: z.string(),
})

const AccountCheckData = z.object({
  type: z.literal('account-check'),
  account: z.string(),
})

export const SolutionData = z.discriminatedUnion('type', [
  SimpleTextSolutionData,
  AccountCheckData,
])

export const stepSolutionTypeLookup: {
  [key in StepType]: string
} = {
  SIMPLE_TEXT: 'simpleTextSolution',
  NFT_CHECK: 'account',
  FUNCTION_CALL: 'account',
  COMETH_API: 'account',
  TOKEN_ID_RANGE: 'account',
}

// @TODO: this 'asChild' logic will break if puzzle belongs to bundle
export const createRewards = async (rewardable: Rewardable) => {
  if (!context.currentUser?.id) {
    throw new AuthenticationError('No current user')
  }

  // create puzzle reward when user solves last step
  await createUserReward({
    input: {
      rewardableId: rewardable.id,
      userId: context.currentUser.id,
    },
  })

  // does this step's puzzle belong to a pack
  // @TODO: why doesn't `rewardable.asChild.length` work here?
  if (rewardable.asChild[0]) {
    const parentPack = await db.rewardable.findUnique({
      where: { id: rewardable.asChild[0].parentId },
      select: {
        id: true,
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
      },
    })

    if (!parentPack) {
      throw new Error('No parent pack for this Rewardable')
    }

    // has this user now completed all puzzles in this pack
    const allPuzzlesSolved = parentPack.asParent.every(
      ({ childRewardable }) => childRewardable.userRewards.length > 0
    )

    // create reward for pack
    if (allPuzzlesSolved) {
      await createUserReward({
        input: {
          rewardableId: parentPack.id,
          userId: context.currentUser.id,
        },
      })
    }
  }
}

export const getStep = async (id: string) => {
  if (!context.currentUser?.id) {
    throw new AuthenticationError('No current user')
  }

  return db.step.findUnique({
    where: { id },
    select: {
      type: true,
      stepNftCheck: {
        select: {
          requireAllNfts: true,
          nftCheckData: true,
        },
      },
      stepFunctionCall: {
        select: {
          contractAddress: true,
          methodIds: true,
        },
      },
      stepTokenIdRange: {
        select: {
          contractAddress: true,
          chainId: true,
          startId: true,
          endId: true,
        },
      },
      stepSimpleText: true,
      puzzle: {
        select: {
          rewardable: {
            select: {
              userRewards: {
                where: { userId: context.currentUser.id },
                select: {
                  id: true,
                },
              },
              id: true,
              asChild: {
                select: {
                  parentId: true,
                },
              },
            },
          },
          steps: {
            orderBy: {
              stepSortWeight: 'asc',
            },
            select: {
              id: true,
              stepSortWeight: true,
            },
          },
        },
      },
    },
  })
}
