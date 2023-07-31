import type { QueryResolvers } from 'types/graphql'

import { getOptionalStepAuthenticated } from 'src/lib/steps'

// this is requireAuth
export const optionalStep: QueryResolvers['optionalStep'] = async ({
  id,
  puzzleId,
}) => {
  return getOptionalStepAuthenticated({ id, puzzleId })
}
