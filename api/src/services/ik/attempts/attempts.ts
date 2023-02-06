import {
  PUZZLE_COOKIE_NAME,
  stepSolutionTypeLookup,
  stepTypeLookup,
} from '@infinity-keys/constants'
import { SolutionData } from '@infinity-keys/core'
import cookie from 'cookie'
import type { MutationResolvers, QueryResolvers } from 'types/graphql'

import { context, ForbiddenError } from '@redwoodjs/graphql-server'

import { isAuthenticated } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { decryptCookie } from 'src/lib/encoding/encoding'
import { createSolve } from 'src/services/solves/solves'
import { step } from 'src/services/steps/steps'
import { createUserReward } from 'src/services/userRewards/userRewards'

import { checkNft } from '../minter/check-nft'

export const makeAttempt: MutationResolvers['makeAttempt'] = async ({
  stepId,
  stepType,
  data,
}) => {
  try {
    SolutionData.parse(data)

    const type = stepTypeLookup[stepType]
    const solutionType = stepSolutionTypeLookup[stepType]
    const attempt = await db.attempt.create({
      data: {
        userId: context?.currentUser.id,
        stepId,
        data,
      },
    })

    const step = await db.step.findUnique({
      where: { id: stepId },
      select: {
        [type]: true,
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

    if (step.puzzle.rewardable.userRewards.length > 0) {
      return { success: false, message: 'You have already solved this puzzle' }
    }

    const userAttempt = data[solutionType]

    if (stepType === 'SIMPLE_TEXT') {
      const attempt = await db.attempt.create({
        data: {
          userId: context?.currentUser.id,
          stepId,
          data,
        },
      })

      if (step[type].solution === userAttempt) {
        await createSolve({
          input: {
            attemptId: attempt.id,
            userId: context.currentUser.id,
          },
        })
        return { success: true }
      }
    }

    if (stepType === 'NFT_CHECK') {
      const { success, nftPass } = await checkNft(userAttempt)

      const attempt = await db.attempt.create({
        data: {
          userId: context?.currentUser.id,
          stepId,
          data: {},
        },
      })

      if (success && nftPass) {
        await createSolve({
          input: {
            attemptId: attempt.id,
            userId: context.currentUser.id,
          },
        })
      }

      return { success: success && nftPass }
    }

    // this needs to go into each step type
    const finalStep = step.puzzle.steps.at(-1).id === stepId

    if (finalStep) {
      // create puzzle reward when user solves last step
      await createUserReward({
        input: {
          rewardableId: step.puzzle.rewardable.id,
          userId: context.currentUser.id,
        },
      })

      // does this step's puzzle belong to a pack
      if (step.puzzle.rewardable.asChild.length > 0) {
        const parentPack = await db.rewardable.findUnique({
          where: { id: step.puzzle.rewardable.asChild[0].parentId },
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

    return { success: true, finalStep }
  } catch (e) {
    console.log(e)
    return { success: false }
  }

  return { success: false }
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
