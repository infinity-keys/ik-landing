import type { QueryResolvers } from 'types/graphql'

import { ForbiddenError, SyntaxError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const stepBySlug: QueryResolvers['stepBySlug'] = async ({
  slug,
  stepNum,
}) => {
  if (!context.currentUser?.id) {
    throw new ForbiddenError('Must be logged in to play.')
  }

  const rewardable = await db.rewardable.findUnique({
    where: {
      slug_type: {
        slug,
        type: 'PUZZLE',
      },
    },
    select: {
      puzzle: {
        select: {
          id: true,
          steps: {
            orderBy: {
              stepSortWeight: 'asc',
            },
            include: {
              attempts: {
                where: {
                  userId: context.currentUser.id,
                  solve: {
                    isNot: null,
                  },
                },
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

  if (!rewardable?.puzzle?.steps.length) {
    throw new SyntaxError('Could not find step')
  }

  const requestedStep = rewardable.puzzle.steps.find(
    ({ stepSortWeight }) => stepSortWeight === stepNum
  )

  if (!requestedStep) {
    throw new SyntaxError('Could not find step')
  }

  // Remove `attempts` data before returning step
  const { attempts: _, ...formattedStep } = requestedStep

  // finds the first step that does not have a solve, the puzzle's steps must be
  // sorted by stepSortWeight. returns 'undefined' if all steps have been solved
  const currentStep = rewardable.puzzle.steps.find(
    (step) => !step.attempts.length
  )

  // if currentStep is undefined, make sure it's because user has solved all steps
  if (typeof currentStep === 'undefined') {
    const hasAllSteps = rewardable.puzzle.steps.every(
      (step) => !!step.attempts.length
    )

    if (hasAllSteps)
      return {
        step: formattedStep,
        puzzleId: rewardable.puzzle.id,
      }

    throw new ForbiddenError('Current step is unknown.')
  }

  // users should only be able to look at current step and steps they've solved
  if (
    stepNum !== currentStep.stepSortWeight &&
    !requestedStep?.attempts.length
  ) {
    throw new ForbiddenError(
      'Step currently not viewable. Please solve previous steps.'
    )
  }

  return {
    step: formattedStep,
    puzzleId: rewardable.puzzle.id,
  }
}
