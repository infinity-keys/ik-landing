import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import cookie from 'cookie'
import type { QueryResolvers } from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'
import { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/functions/types'

import { decryptCookie } from 'src/lib/encoding/encoding'
import { step } from 'src/services/steps/steps'

const getOptionalStep = ({
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
