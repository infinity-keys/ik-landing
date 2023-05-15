import type { QueryResolvers } from 'types/graphql'

import {
  getOptionalStepAnonymous,
  getOptionalStepAuthenticated,
} from 'src/lib/steps'

// this is requireAuth
export const optionalStep: QueryResolvers['optionalStep'] = async ({
  id,
  puzzleId,
}) => {
  return getOptionalStepAuthenticated({ id, puzzleId })
}

// This is skipAuth, relies on cookies to track progression of logged out users
export const anonOptionalStep: QueryResolvers['anonOptionalStep'] = async (
  { id, puzzleId, stepNum },
  { context }
) => {
  if (context?.currentUser) {
    return getOptionalStepAuthenticated({ id, puzzleId })
  }

  return getOptionalStepAnonymous({ id, puzzleId, stepNum, context })
}
