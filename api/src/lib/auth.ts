import { Magic } from '@magic-sdk/admin'
import { SiteRole } from 'types/graphql'

import { Decoded } from '@redwoodjs/api'
import {
  AuthenticationError,
  context,
  ForbiddenError,
} from '@redwoodjs/graphql-server'

import { db } from './db'

/**
 * Represents the user attributes returned by the decoding the
 * Authentication provider's JWT together with an optional list of roles.
 */
type RedwoodUser = Record<string, unknown> & { roles?: SiteRole[] }

/**
 * getCurrentUser returns the user information together with
 * an optional collection of roles used by requireAuth() to check
 * if the user is authenticated or has role-based access
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the return object only once you've decided they are safe to be seen
 * if someone were to open the Web Inspector in their browser.
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 *
 * @param decoded - The decoded access token containing user info and JWT
 *   claims like `sub`. Note, this could be null.
 * @param { token, SupportedAuthTypes type } - The access token itself as well
 *   as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An optional object which
 *   contains information from the invoker such as headers and cookies, and the
 *   context information about the invocation such as IP Address
 * @returns RedwoodUser
 */

const mAdmin = new Magic(process.env.MAGICLINK_SECRET)

export const authDecoder = async (token: string, type: string) => {
  if (type !== 'magicLink') {
    return null
  }

  await mAdmin.token.validate(token)
  const [proof, claim] = mAdmin.token.decode(token)

  return { proof, claim }
}

export const getCurrentUser = async (
  decoded: Decoded,
  { token }: { token: string }
): Promise<RedwoodUser | null> => {
  if (!decoded) {
    return null
  }

  if (!token) throw new AuthenticationError('No token')
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
      roles: ['VERIFIED'],
    },
  })
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

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles: {@link AllowedRoles} - Checks if the currentUser is assigned one of these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = (roles: SiteRole | SiteRole[]): boolean => {
  if (!isAuthenticated()) return false

  const userRoles = context.currentUser?.roles

  if (!userRoles) throw new ForbiddenError('Not authorized')

  if (typeof roles === 'string') return userRoles.includes(roles)

  return userRoles.some((userRole) => roles.includes(userRole))
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
export const requireAuth = ({ roles }: { roles?: SiteRole | SiteRole[] }) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError('Not authenticated')
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
