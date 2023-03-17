import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import cookie from 'cookie'
import type { QueryResolvers } from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'
import { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/functions/types'

import { PuzzlesData } from 'src/lib/cookie'
import { db } from 'src/lib/db'
import { decryptCookie } from 'src/lib/encoding/encoding'
import { step } from 'src/services/steps/steps'

const getPuzzle = async (id: string) => {
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

const getOptionalStep = async ({
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

  // @TODO: gotta cache em all

  // users should be allowed to view first steps if authenticated or if the
  // puzzle is anonymous
  if (stepNum === 1) return step({ id })

  // decrypt and validate the cookie data
  const puzzlesCompletedCypherText = cookie.parse(
    context.event.headers.cookie || ''
  )[PUZZLE_COOKIE_NAME]
  const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)

  if (!puzzlesCompleted) {
    throw new ForbiddenError('Step currently not viewable.')
  }

  // at this point users should have a valid cookie
  PuzzlesData.parse(puzzlesCompleted)

  // all the step ids for this puzzle in the cookie
  const cookieSteps = puzzlesCompleted?.puzzles[puzzleId]?.steps

  // users should have at least one step at this point
  if (cookieSteps.length === 0) {
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
    throw new ForbiddenError('Step currently not viewable.')
  }

  return step({ id })
}

// this is requireAuth
export const optionalStep: QueryResolvers['optionalStep'] = async (
  { id, puzzleId, stepNum },
  { context }
) => {
  return getOptionalStep({ id, puzzleId, stepNum, context })
}

// this is skipAuth
export const anonOptionalStep: QueryResolvers['anonOptionalStep'] = async (
  { id, puzzleId, stepNum },
  { context }
) => {
  return getOptionalStep({ id, puzzleId, stepNum, context })
}
