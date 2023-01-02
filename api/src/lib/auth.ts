/**
 * Once you are ready to add authentication to your application
 * you'll build out requireAuth() with real functionality. For
 * now we just return `true` so that the calls in services
 * have something to check against, simulating a logged
 * in user that is allowed to access that service.
 *
 * See https://redwoodjs.com/docs/authentication for more info.
 */
import { Magic } from '@magic-sdk/admin'

import { AuthenticationError, context } from '@redwoodjs/graphql-server'

import { db } from './db'

export const getCurrentUser = async (_decoded, { token }) => {
  const mAdmin = new Magic(process.env.MAGICLINK_SECRET)
  const { issuer } = await mAdmin.users.getMetadataByToken(token)

  return await db.user.findUnique({ where: { authId: issuer } })
}

export const isAuthenticated = () => {
  return !!context.currentUser
}

export const hasRole = ({ roles }) => {
  return roles !== undefined
}

// This is used by the redwood directive
// in ./api/src/directives/requireAuth

// Roles are passed in by the requireAuth directive if you have auth setup
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw new AuthenticationError('Not authenticated')
  }

  // if (roles && !hasRole(roles)) {
  //   throw new ForbiddenError("You don't have access to do that.")
  // }
}
