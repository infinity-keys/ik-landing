import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import cookie from 'cookie'

import { ForbiddenError } from '@redwoodjs/graphql-server'
import { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/functions/types'
import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { PuzzlesData } from 'src/lib/cookie'
import { decryptCookie } from 'src/lib/encoding/encoding'
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

export const getOptionalStepAnonymous = async ({
  id,
  puzzleId,
  stepNum,
  context,
}: {
  id: string
  puzzleId: string
  stepNum: number
  context: RedwoodGraphQLContext
}) => {
  // users don't need specific step data on the puzzle landing page
  if (!id) return

  // users should be allowed to view first steps if authenticated or if the
  // puzzle is anonymous
  if (stepNum === 1) return step({ id })

  // decrypt and validate the cookie data
  const puzzlesCompletedCypherText = cookie.parse(
    context.event.headers.cookie || ''
  )[PUZZLE_COOKIE_NAME]
  const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)

  if (!puzzlesCompleted) {
    throw new ForbiddenError(
      'Step currently not viewable. Please solve previous steps or sync your progress in the profile page.'
    )
  }

  // at this point users should have a valid cookie
  PuzzlesData.parse(puzzlesCompleted)

  // all the step ids for this puzzle in the cookie
  const cookieSteps = puzzlesCompleted?.puzzles[puzzleId]?.steps

  // users should have at least one step at this point
  if (!cookieSteps || cookieSteps?.length === 0) {
    throw new ForbiddenError('Must solve all previous steps.')
  }

  const puzzle = await getPuzzle(puzzleId)

  // finds the first step that is not in the cookie, the puzzle's steps must be
  // sorted by stepSortWeight. returns 'undefined' if all steps have been solved
  const currentStep = puzzle.steps.find(
    (step) => !cookieSteps.includes(step.id)
  )

  // if currentStep is undefined, make sure it's because user has solved all steps
  if (typeof currentStep === 'undefined') {
    const hasAllSteps = puzzle.steps.every((step) =>
      cookieSteps.includes(step.id)
    )

    if (hasAllSteps) return step({ id })
    throw new ForbiddenError('Current step is unknown.')
  }

  // users should only be able to look at current step and steps they've solved
  if (id !== currentStep.id && !cookieSteps.includes(id)) {
    throw new ForbiddenError(
      'Step currently not viewable. Please solve previous steps or sync your progress in the profile page.'
    )
  }

  return step({ id })
}
