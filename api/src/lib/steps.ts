import { ForbiddenError } from '@redwoodjs/graphql-server'
import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { step } from 'src/services/steps/steps'

export const getPuzzleWithSolves = async (id: string) => {
  return db.puzzle.findUnique({
    where: { id },
    include: {
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
          },
        },
      },
    },
  })
}

export const getPuzzle = async (id: string) => {
  return db.puzzle.findUnique({
    where: { id },
    include: {
      steps: {
        orderBy: {
          stepSortWeight: 'asc',
        },
      },
    },
  })
}

export const getOptionalStepAuthenticated = async ({
  id,
  puzzleId,
}: {
  id: string
  puzzleId: string
}) => {
  // users don't need specific step data on the puzzle landing page
  if (!id) return

  const puzzle = await getPuzzleWithSolves(puzzleId)

  // finds the first step that does not have a solve, the puzzle's steps must be
  // sorted by stepSortWeight. returns 'undefined' if all steps have been solved
  const currentStep = puzzle.steps.find((step) => !step.attempts.length)

  // if currentStep is undefined, make sure it's because user has solved all steps
  if (typeof currentStep === 'undefined') {
    const hasAllSteps = puzzle.steps.every((step) => !!step.attempts.length)

    if (hasAllSteps) return step({ id })
    throw new ForbiddenError('Current step is unknown.')
  }

  const requestedStep = puzzle.steps.find((step) => step.id === id)

  // users should only be able to look at current step and steps they've solved
  if (id !== currentStep.id && !requestedStep?.attempts.length) {
    throw new ForbiddenError(
      'Step currently not viewable. Please solve previous steps or sync your progress in the profile page.'
    )
  }

  return step({ id })
}
