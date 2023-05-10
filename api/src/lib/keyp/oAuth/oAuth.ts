import { AuthProviderType } from '@infinity-keys/core'
import pkceChallenge from 'pkce-challenge'
import { v4 as uuidv4 } from 'uuid'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { providers, types } from 'src/lib/keyp/oAuth/providers'
import { logger } from 'src/lib/logger'

export const oAuthUrl = async (type: AuthProviderType) => {
  try {
    if (!Object.values(types).includes(type))
      throw `OAuth Provider ${type} is not enabled.`

    const { params, urlAuthorize, responseType } = providers[type]

    const url = new URL(urlAuthorize)
    const pkce = pkceChallenge()
    url.searchParams.set('code_challenge', pkce.code_challenge) // eg. 3uWDl1fX2ioAqf38eSOFlKnxVEl_VyfaYKG2GyLndKs
    url.searchParams.set('code_challenge_method', 'S256')
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    // Note: Feel free to add additional data to state, but if the authorization server doesn't
    // support PKCE yet you must include a random string for CSRF protection
    const state = uuidv4()

    // For oAuth codeGrant, we sometimes need the user id'
    // TODO: used authId here and updated schema
    let userId
    if (typeof context.currentUser?.authId === 'string')
      userId = context.currentUser?.authId

    await db.oAuth.create({
      data: {
        state,
        codeVerifier: pkce.code_verifier,
        codeChallenge: pkce.code_challenge,
        ...(userId
          ? {
              user: {
                connect: {
                  id: userId,
                },
              },
            }
          : {}),
      },
    })

    url.searchParams.set('response_type', responseType)
    url.searchParams.set('state', state)
    return {
      text: 'success',
      type: 'redirect',
      url: url.href,
    }
  } catch (e) {
    logger.error(e)
    if (e instanceof Error) {
      throw new AuthenticationError(e.message)
    }
    throw new AuthenticationError('Error creating OAuth URL')
  }
}

export const processCodeGrant = async ({
  state,
  code,
  type,
  _accountId,
}: {
  state: string
  code: string
  type: AuthProviderType
  _accountId: string
}) => {
  try {
    logger.debug(`code grant - ${type}`)
    if (!types.includes(type)) throw `Unknown OAuth Provider - ${type}`

    const tokens = await submitCodeGrant({ state, code, type })
    logger.debug({ custom: tokens, _accountId }, 'onSubmitCode() response')

    // @TODO: Is there a better way to do this?
    return providers[type as keyof typeof providers].onConnected(tokens)
  } catch (e) {
    logger.error(e)
    if (e instanceof Error) {
      throw new AuthenticationError(e.message)
    }
    throw new AuthenticationError('Error creating OAuth URL')
  }
}

// @NOTE: `onRevoke` doesn't exist anywhere
// export const processRevoke = async (type: AuthProviderType) => {
//   try {
//     logger.debug(`revoke - ${type}`)
//     if (!types.includes(type)) throw `Unknown OAuth Provider - ${type}`
//     const { onRevoke } = providers[type]
//     return onRevoke()
//   } catch (e) {
//     logger.error(e)
//     throw new AuthenticationError(e)
//   }
// }

export const submitCodeGrant = async ({
  state,
  code,
  type,
}: {
  state: string
  code: string
  type: AuthProviderType
}) => {
  if (!Object.values(types).includes(type))
    throw `OAuth Provider "${type}" is not enabled.`

  // Delete the OAuth Item
  let oAuth
  try {
    oAuth = await db.oAuth.delete({ where: { state } })
    if (!oAuth) throw 'state not valid'
  } catch (e) {
    throw 'Oauth state has expired. Please start over.'
  }

  // @NOTE: added getTime()
  // Check expiration
  if (
    new Date().getTime() - new Date(oAuth.createdAt).getTime() >
    10 * 60 * 1000
  )
    throw 'Sorry, authentication must be completed within 10 minutes.'

  const { onSubmitCode } = providers[type]
  return onSubmitCode(code, oAuth)
}
