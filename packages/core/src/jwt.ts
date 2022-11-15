import { IK_CLAIMS_NAMESPACE, JWT_SECRET_KEY } from '@infinity-keys/constants'
import { jwtVerify, SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { v4 as uuidv4 } from 'uuid'

import { IkJwt } from './types'
// import { Thumbnail, ThumbnailPack, ThumbnailPuzzle } from './types'

export const epochMinus30s = () => Math.round(new Date().getTime() / 1000) - 30

export type HasuraRoles = 'anonymous' | 'user' | 'manager' | 'api' | 'admin'

export interface HasuraClaims {
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': HasuraRoles[]
    'x-hasura-default-role': HasuraRoles
  }
}

// const anonymousClaims: HasuraClaims = { "https://hasura.io/jwt/claims": {
//   "x-hasura-allowed-roles": ["anonymous", "user", "manager", "api", "admin"],
//   "x-hasura-default-role": "anonymous",
//   },
// };

const apiClaims: HasuraClaims = {
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': ['anonymous', 'user', 'manager', 'api', 'admin'],
    'x-hasura-default-role': 'api',
  },
}

// API/backend tokens
let apiToken: Promise<string> | undefined = undefined
// Use this same token for all API requests during this session
export const makeApiToken = () => {
  if (apiToken) return apiToken

  apiToken = new SignJWT({
    ...apiClaims,
  })
    .setExpirationTime('1H')
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt(epochMinus30s()) // Offset 30s because stuipd clocks
    .sign(new TextEncoder().encode(JWT_SECRET_KEY))

  return apiToken
}

/**
 * Create a token for a user
 */
export const makeUserToken = (payload: IkJwt, userId?: string) => {
  const token = new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(epochMinus30s())
    .setJti(nanoid())

  // If there is no subject in payload - or a userId is provided - set the subject to either the
  // userId or uuid()
  if (!payload.sub || userId) {
    token.setSubject(userId ?? uuidv4())
  }

  return token.sign(new TextEncoder().encode(JWT_SECRET_KEY))
}

/**
 * Verify all tokens from the same shared secret
 */
export const verifyToken = (token: string) =>
  jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY))

/**
 * Given a JWT string, check that the users claims claim one or mroe puzzle
 * namespaces
 */
export const jwtHasClaim = async (jwt: string, puzzle: string[]) => {
  const verified = await verifyToken(jwt)
  if (!verified) return false

  // @TOOD: pull in superstruct or use jose's validator to ensure shape
  const payload = verified.payload as unknown as IkJwt

  return !!puzzle.filter((puzzle) =>
    payload?.claims?.[IK_CLAIMS_NAMESPACE].puzzles.includes(puzzle)
  ).length
}
