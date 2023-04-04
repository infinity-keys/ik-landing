import { z } from 'zod'
import type { StepType } from 'types/graphql'
import { context } from '@redwoodjs/graphql-server'
import { createUserReward } from 'src/services/userRewards/userRewards'
import { db } from 'src/lib/db'

const SimpleTextSolutionData = z.object({
  type: z.literal('simple-text'),
  simpleTextSolution: z.string(),
})

const NftCheckSolutionData = z.object({
  type: z.literal('nft-check'),
  nftCheckSolution: z.object({
    account: z.string(),
  }),
})

const TokenIdRangeSolutionData = z.object({
  type: z.literal('token-id-range'),
  tokenIdRangeSolution: z.object({
    account: z.string(),
  }),
})

const FunctionCallSolutionData = z.object({
  type: z.literal('function-call'),
  functionCallSolution: z.object({
    account: z.string(),
  }),
})

const ComethApiSolutionData = z.object({
  type: z.literal('cometh-api'),
  comethApiSolution: z.object({
    account: z.string(),
  }),
})

export const SolutionData = z.discriminatedUnion('type', [
  SimpleTextSolutionData,
  NftCheckSolutionData,
  FunctionCallSolutionData,
  ComethApiSolutionData,
  TokenIdRangeSolutionData,
])

export const stepSolutionTypeLookup: {
  [key in StepType]: string
} = {
  SIMPLE_TEXT: 'simpleTextSolution',
  NFT_CHECK: 'nftCheckSolution',
  FUNCTION_CALL: 'functionCallSolution',
  COMETH_API: 'comethApiSolution',
  TOKEN_ID_RANGE: 'tokenIdRangeSolution',
}

// @TODO: this 'asChild' logic will break if puzzle belongs to bundle
export const createRewards = async (rewardable) => {
  // create puzzle reward when user solves last step
  await createUserReward({
    input: {
      rewardableId: rewardable.id,
      userId: context.currentUser.id,
    },
  })

  // does this step's puzzle belong to a pack
  if (rewardable.asChild.length > 0) {
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

export const getStep = async (id) => {
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
