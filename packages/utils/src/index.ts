import {
  IK_CLAIMS_NAMESPACE,
  PACK_COLLECTION_BASE,
  PACK_LANDING_BASE,
  PUZZLE_COLLECTION_BASE,
  PUZZLE_FAILED_BASE,
  PUZZLE_LANDING_BASE,
  PUZZLE_SUCCESS_BASE,
  JWT_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
  welcome,
  chainIds,
} from '@infinity-keys/constants'
import { IkJwt } from '@infinity-keys/types'
import { buildUrl } from 'cloudinary-build-url'
import { jwtVerify, SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { v4 as uuidv4 } from 'uuid'
// import { Thumbnail, ThumbnailPack, ThumbnailPuzzle } from '@infinity-keys/types'

// Routes
export const routeLandingUrl = (slug: string) =>
  `/${PUZZLE_LANDING_BASE}/${slug}`
export const packsLandingUrl = (slug: string) => `/${PACK_LANDING_BASE}/${slug}`
export const routeSuccessUrl = (slug: string) =>
  `/${PUZZLE_SUCCESS_BASE}/${slug}`
export const routeFailUrl = (slug: string) => `/${PUZZLE_FAILED_BASE}/${slug}`
export const collectionBaseUrl = (isPack: boolean) => {
  return isPack ? `/${PACK_COLLECTION_BASE}` : `/${PUZZLE_COLLECTION_BASE}`
}

export const buildUrlString = (path: string) => {
  const url = new URL(path, IK_CLAIMS_NAMESPACE)
  return url.toString()
}

// Wallet stuff
export const message = (nonce: string) => `${welcome}\n\n${nonce}`

// Hasura/GraphQL stuff

/**
 * Linebreaks in Hasura text fields get escaped like \\n but we need \n.
 */
export const cleanGqlMarkdown = (markdown: string) =>
  markdown.split(/\\n/).join('\n')

export const toHex = (num: number) => {
  const val = Number(num)
  return '0x' + val.toString(16)
}

// // Thumbnail grid
// export const isTypePack = (
//   data: ThumbnailPack | ThumbnailPuzzle
// ): data is ThumbnailPack => {
//   return (data as ThumbnailPack).pack_name !== undefined
// }

// // normalize pack and puzzle data for Thumbnail
// export const thumbnailData = (
//   data: ThumbnailPack | ThumbnailPuzzle
// ): Thumbnail => {
//   const pack = isTypePack(data)

//   const cloudinary_id = pack
//     ? data.cloudinary_id
//     : data.nft?.nft_metadatum?.cloudinary_id

//   return {
//     id: pack ? data.pack_id : data.puzzle_id,
//     name: pack ? data.pack_name : data.simple_name,
//     url: pack
//       ? packsLandingUrl(data.simple_name)
//       : routeLandingUrl(data.landing_route),
//     cloudinary_id: cloudinary_id || undefined,
//   }
// }

export const validChain = (chain: number) => chainIds.includes(chain)

export const buildTokenIdParams = (tokenIds: number[] | string[]) => {
  return tokenIds.map((id) => `tokenids=${id}`).join('&')
}

export const generateUserDeleteJWT = async (userId: string, email?: string) => {
  return await makeUserToken(
    {
      claims: {
        [IK_CLAIMS_NAMESPACE]: { puzzles: [], email },
      },
    },
    userId
  )
}

export const generateUserDeleteUrl = async (userId: string, email?: string) => {
  const jwt = await generateUserDeleteJWT(userId, email)

  const url = new URL('/user/delete', IK_CLAIMS_NAMESPACE)
  url.searchParams.set('jwt', jwt)

  return url
}

// ********* JWT ********* //

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

// ********* Images ********* //

export const cloudinaryUrl = (
  id: string,
  height: number,
  width: number,
  circle: boolean
) => {
  return buildUrl(id, {
    cloud: {
      cloudName: CLOUDINARY_CLOUD_NAME,
    },
    transformations: {
      quality: '100',
      radius: circle ? 'max' : 0,
      format: 'png',
      dpr: 3,
      resize: {
        type: 'scale',
        width,
        height,
      },
    },
  })
}
