import { SiteRole, User } from 'types/graphql'

import type { Decoded } from '@redwoodjs/api'
import {
  AuthenticationError,
  context,
  ForbiddenError,
} from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

/**
 * Represents the user attributes returned by the decoding the
 * Authentication provider's JWT together with an optional list of roles.
 */
type CurrentUser = Pick<
  User,
  'id' | 'username' | 'email' | 'authId' | 'roles' | 'address'
>

/**
 * The session object sent in as the first argument to getCurrentUser() will
 * have a single key `id` containing the unique ID of the logged in user
 * (whatever field you set as `authFields.id` in your auth function config).
 * You'll need to update the call to `db` below if you use a different model
 * name or unique field name, for example:
 *
 *   return await db.profile.findUnique({ where: { email: session.id } })
 *                   ───┬───                       ──┬──
 *      model accessor ─┘      unique id field name ─┘
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the `select` object below once you've decided they are safe to be
 * seen if someone were to open the Web Inspector in their browser.
 */

export const getCurrentUser = async (
  session: Decoded
): Promise<CurrentUser | null> => {
  if (!session || typeof session.id !== 'string') {
    return null
  }

  const user = await db.user.findUnique({
    // @NOTE: session.id is equal to user.authId
    where: { authId: session.id },
    select: {
      id: true,
      username: true,
      email: true,
      authId: true,
      roles: true,
      address: true,
    },
  })

  logger.debug({ custom: user }, 'getCurrentUser')
  return user
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */

type AllowedRoles = SiteRole | SiteRole[]

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles: {@link AllowedRoles} - Checks if the currentUser is assigned one of these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = (roles: AllowedRoles): boolean => {
  if (!isAuthenticated()) return false

  const userRoles = context.currentUser?.roles

  if (!userRoles) throw new ForbiddenError('Not authorized')

  if (typeof roles === 'string') return userRoles.includes(roles)

  return userRoles
    .flatMap((userRole) => (userRole ? [userRole] : []))
    .some((userRole) => roles.includes(userRole))
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param roles?: {@link AllowedRoles} - When checking role membership, these roles grant access.
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {@link AuthenticationError} - If the currentUser is not authenticated
 * @throws {@link ForbiddenError} - If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ roles }: { roles?: AllowedRoles }) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError('Not authenticated')
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
