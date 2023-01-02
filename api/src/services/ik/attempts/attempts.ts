import type { MutationResolvers } from 'types/graphql'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const makeAttempt: MutationResolvers['makeAttempt'] = (
  { stepId, data },
  { context }
) => {
  if (!context.currentUser || typeof context.currentUser === 'string') {
    throw new AuthenticationError('Not authenticated')
  }

  console.log('context: ')
  console.log({ stepId, data })
  return db.attempt.create({
    data: {
      attemptedAt: new Date().toISOString(),
      // @TODO: why error
      userId: context?.currentUser.id,
      stepId,
      data,
    },
  })
}
