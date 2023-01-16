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
  if (!token) throw new AuthenticationError('No token')

  const mAdmin = new Magic(process.env.MAGICLINK_SECRET)
  const { issuer, email } = await mAdmin.users.getMetadataByToken(token)

  if (!issuer) throw new AuthenticationError('Not recognized by auth provider')

  return await db.user.upsert({
    where: {
      authId: issuer,
    },
    update: {
      lastLoggedIn: new Date().toISOString(),
    },
    create: {
      email,
      authId: issuer,
      siteRole: 'VERIFIED',
    },
  })
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
export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw new AuthenticationError('Not authenticated')
  }

  // if (roles && !hasRole(roles)) {
  //   throw new ForbiddenError("You don't have access to do that.")
  // }
}
