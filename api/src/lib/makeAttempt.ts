import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { AuthenticationError, context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { createSolve } from 'src/services/solves/solves'
import { createUserReward } from 'src/services/userRewards/userRewards'

// Parsing/validating the data sent from the front end
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

type SolutionDataType = z.infer<typeof SolutionData>

export const getAttempt = (solutionData: SolutionDataType) => {
  if ('account' in solutionData) return solutionData.account
  if ('simpleTextSolution' in solutionData)
    return solutionData.simpleTextSolution

  throw new Error('Cannot create attempt - incorrect user attempt data')
}

// Gets type for relational fields and partial Rewardable fields
const rewardableData = Prisma.validator<Prisma.RewardableArgs>()({
  select: {
    id: true,
    userRewards: {
      select: {
        id: true,
      },
    },
    asChild: {
      select: {
        parentId: true,
      },
    },
  },
})

type RewardableData = Prisma.RewardableGetPayload<typeof rewardableData>

// Helper functions
export const createAttempt = async (stepId: string, attemptData = {}) => {
  if (!context.currentUser) {
    throw new AuthenticationError('No current user')
  }
  return db.attempt.create({
    data: {
      userId: context.currentUser.id,
      stepId,
      data: attemptData,
    },
  })
}

export const createNewSolve = async ({
  attemptId,
  finalStep,
  rewardable,
}: {
  attemptId: string
  finalStep: boolean
  rewardable: RewardableData
}) => {
  if (!context.currentUser) {
    throw new AuthenticationError('No current user')
  }
  await createSolve({
    input: {
      attemptId,
      userId: context.currentUser.id,
    },
  })

  if (finalStep) {
    await createRewards(rewardable)
  }
}

export const createResponse = async ({
  success,
  errors,
  attemptId,
  finalStep,
  rewardable,
}: {
  success?: boolean
  errors?: string[]
  attemptId: string
  finalStep: boolean
  rewardable: RewardableData
}) => {
  if (errors && errors.length > 0) return { success: false, message: errors[0] }

  if (typeof success === 'undefined')
    return { success: false, message: '"success" is undefined' }

  if (success) {
    await createNewSolve({ attemptId, finalStep, rewardable })
  }

  return { success, finalStep }
}

// @TODO: this 'asChild' logic will break if puzzle belongs to bundle
export const createRewards = async (rewardable: RewardableData) => {
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

  // Does this step's puzzle belong to a pack
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
          startIds: true,
          endIds: true,
        },
      },
      stepSimpleText: true,
      stepOriumApi: {
        select: {
          checkType: true,
        },
      },
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
