import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import cookie from 'cookie'
import type { MutationResolvers, QueryResolvers } from 'types/graphql'
import { z } from 'zod'

import { context, ForbiddenError } from '@redwoodjs/graphql-server'

import { isAuthenticated } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { decryptCookie } from 'src/lib/encoding/encoding'
import { createSolve } from 'src/services/solves/solves'
import { step } from 'src/services/steps/steps'
import { createUserReward } from 'src/services/userRewards/userRewards'

const SolutionData = z
  .object({
    simpleTextSolution: z.string(),
    // add more types here
  })
  .partial()
  .refine(
    (data) =>
      // add corresponding type here
      data.simpleTextSolution,
    'Invalid solution type'
  )

export const makeAttempt: MutationResolvers['makeAttempt'] = async ({
  stepId,
  data,
}) => {
  try {
    SolutionData.parse(data)

    const attempt = await db.attempt.create({
      data: {
        userId: context?.currentUser.id,
        stepId,
        data,
      },
    })

    const stepType = 'stepSimpleText'
    const solutionType = 'simpleTextSolution'

    const step = await db.step.findUnique({
      where: { id: stepId },
      select: {
        [stepType]: true,
        puzzle: {
          select: {
            rewardable: {
              select: {
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

    const userAttempt = data[solutionType]

    if (step[stepType].solution === userAttempt) {
      await createSolve({
        input: {
          attemptId: attempt.id,
          userId: context.currentUser.id,
        },
      })

      const finalStep = step.puzzle.steps.at(-1).id === stepId

      if (finalStep) {
        // @TODO: handle user solving multiple
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
                rewardableId: step.puzzle.rewardable.asChild[0].parentId,
                userId: context.currentUser.id,
              },
            })
          }
        }
      }

      return { success: true, finalStep }
    }
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
