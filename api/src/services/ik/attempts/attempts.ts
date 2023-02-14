import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import cookie from 'cookie'
import type { MutationResolvers, QueryResolvers, StepType } from 'types/graphql'
import { z } from 'zod'

import { context, ForbiddenError } from '@redwoodjs/graphql-server'

import { isAuthenticated } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { decryptCookie } from 'src/lib/encoding/encoding'
import { createSolve } from 'src/services/solves/solves'
import { step } from 'src/services/steps/steps'
import { createUserReward } from 'src/services/userRewards/userRewards'

import { checkNft } from '../minter/check-nft'

export const stepSolutionTypeLookup: {
  [key in StepType]: string
} = {
  SIMPLE_TEXT: 'simpleTextSolution',
  NFT_CHECK: 'nftCheckSolution',
}

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

const SolutionData = z.discriminatedUnion('type', [
  SimpleTextSolutionData,
  NftCheckSolutionData,
])

// @TODO: this 'asChild' logic will break if puzzle belongs to bundle
const createRewards = async (rewardable) => {
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

const getStep = async (id) => {
  return db.step.findUnique({
    where: { id },
    select: {
      type: true,
      stepNftCheck: {
        select: {
          nftCheckLogic: true,
          nftCheckData: true,
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

export const makeAttempt: MutationResolvers['makeAttempt'] = async ({
  stepId,
  data,
}) => {
  try {
    SolutionData.parse(data)

    const step = await getStep(stepId)

    if (step.puzzle.rewardable.userRewards.length > 0) {
      return { success: false, message: 'You have already solved this puzzle' }
    }

    // all the solving logic relies on this function
    // ensure steps are ordered by sortWeight
    const finalStep = step.puzzle.steps.at(-1).id === stepId
    const solutionType = stepSolutionTypeLookup[step.type]
    const userAttempt = data[solutionType]

    if (step.type === 'SIMPLE_TEXT') {
      const attempt = await db.attempt.create({
        data: {
          userId: context?.currentUser.id,
          stepId,
          data,
        },
      })

      const correctAttempt =
        step.stepSimpleText.solution.toLowerCase() === userAttempt.toLowerCase()

      if (correctAttempt) {
        await createSolve({
          input: {
            attemptId: attempt.id,
            userId: context.currentUser.id,
          },
        })

        if (finalStep) {
          await createRewards(step.puzzle.rewardable)
        }
      }
      return { success: correctAttempt, finalStep }
    } // end of SIMPLE_TEXT

    if (step.type === 'NFT_CHECK') {
      const attempt = await db.attempt.create({
        data: {
          userId: context?.currentUser.id,
          stepId,
          data: {},
        },
      })

      const { nftPass, errors } = await checkNft({
        account: userAttempt.account,
        nftCheckData: step.stepNftCheck.nftCheckData,
        checkLogic: step.stepNftCheck.nftCheckLogic,
      })

      if (errors && errors.length > 0) {
        return { success: false, message: 'Error checking NFT' }
      }

      if (nftPass) {
        await createSolve({
          input: {
            attemptId: attempt.id,
            userId: context.currentUser.id,
          },
        })

        if (finalStep) {
          await createRewards(step.puzzle.rewardable)
        }
      }

      return { success: nftPass, finalStep }
    } // end of NFT_CHECK

    return { success: false }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}

export const optionalStep: QueryResolvers['optionalStep'] = async (
  { id, puzzleId, stepNum },
  { context }
) => {
  // users don't need specific step data on the puzzle landing page
  if (!id) return

  // unauthenticated users can't see specific step data
  if (!isAuthenticated()) {
    throw new ForbiddenError('must sign in')
  }

  // authenticated users should be allowed to view first steps
  if (stepNum === 1) return step({ id })

  const puzzlesCompletedCypherText = cookie.parse(context.event.headers.cookie)[
    PUZZLE_COOKIE_NAME
  ]

  const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)

  // get the number of completed steps for user on this puzzle. they should
  // be allowed to view previous steps and the current step they are on
  const visibleSteps = puzzlesCompleted?.puzzles[puzzleId]?.steps.length + 1

  // ensure they've solved the correct number of previous steps for the step
  // they are trying to view
  if (stepNum > visibleSteps || !visibleSteps) {
    throw new ForbiddenError('Step currently not viewable.')
  }

  return step({ id })
}
