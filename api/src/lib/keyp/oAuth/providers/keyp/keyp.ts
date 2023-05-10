import fetch from 'cross-fetch'
import { JWTPayload, decodeJwt } from 'jose'
import { OAuth } from 'types/graphql'

import { db } from 'src/lib/db'
import { encodeBody, getExpiration } from 'src/lib/keyp/oAuth/helpers'
import { logger } from 'src/lib/logger'

export const KEYP = 'KEYP'

const KEYP_OAUTH_DOMAIN = process.env.LOCAL_KEYP_SERVER
  ? 'http://localhost/oauth'
  : 'https://app.usekeyp.com/oauth'

export const KEYP_OAUTH_URL_AUTHORIZE = `${KEYP_OAUTH_DOMAIN}/auth`

const KEYP_OAUTH_URL_TOKEN = `${KEYP_OAUTH_DOMAIN}/token`

const KEYP_REDIRECT_URI = process.env.APP_DOMAIN + '/redirect/keyp'

const responseType = 'code'
const params = {
  client_id: process.env.KEYP_CLIENT_ID || '',
  scope: 'openid email',
  redirect_uri: KEYP_REDIRECT_URI,
}

export const onSubmitCode = async (code: string, { codeVerifier }: OAuth) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.KEYP_CLIENT_ID,
      redirect_uri: KEYP_REDIRECT_URI,
      code_verifier: codeVerifier,
      code,
    }
    const encodedBody = encodeBody(body)
    logger.debug({ custom: body }, '/token request body')
    const response = await fetch(KEYP_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(async (res) => {
      const status = res.status
      if (status !== 200) {
        const text = await res.json()
        throw `KEYP API failed for /token. Returned ${status} - ${text.error} ${text.error_description}`
      }
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      access_token: accessToken,
      expires_in: expiration,
      id_token: idToken,
    } = response

    if (!response.id_token) throw 'Failed to get id_token'
    const decoded = await decodeJwt(idToken)

    logger.debug({ custom: response }, '/token response')
    logger.debug({ custom: decoded }, 'decoded id_token')

    // @NOTE: added getTime()
    if (
      decoded &&
      decoded.iat &&
      new Date().getTime() - new Date(decoded.iat * 1000).getTime() > 60 * 1000
    )
      throw 'id_token was not issued recently. It must be <1 minute old.'

    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      idToken,
      decoded,
      // @TODO: what to use if `decoded.exp` is undefined?
      idTokenExpiration: new Date(decoded.exp * 1000),
    }
  } catch (e) {
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({
  accessToken,
  decoded,
}: {
  accessToken: string
  decoded: JWTPayload
}) => {
  try {
    const userDetails = await fetch(`${KEYP_OAUTH_DOMAIN}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      if (res.status != 200)
        throw 'KEYP authorization failed, or secret invalid'
      return res.json()
    })

    // Prevent token substitution attacks. See https://openid.net/specs/openid-connect-core-1_0.html#TokenSubstitution
    if (decoded.sub != userDetails.sub)
      throw "id_token's sub does not match userInfo"

    logger.debug({ custom: userDetails }, 'User info')

    // Find user if they are in the db with a Magic Link authId
    const magicLinkUser = await db.user.findFirst({
      where: {
        email: userDetails.email,
        authId: {
          startsWith: 'did:ethr:',
        },
      },
    })

    // Move existing users to the new auth system. Should only run once per user
    if (magicLinkUser) {
      try {
        const user = await db.user.update({
          where: { email: userDetails.email },
          data: {
            authId: userDetails.sub,
            username: userDetails.username,
            address: userDetails.address,
            lastLoggedIn: new Date().toISOString(),
            accessToken,
          },
        })
        return user
      } catch {
        throw new Error('Problem updating existing user')
      }
    }

    // At this point authId should be unique and using the new system
    try {
      const user = await db.user.upsert({
        update: {
          email: userDetails.email,
          lastLoggedIn: new Date().toISOString(),
          accessToken,
        },
        create: {
          authId: userDetails.sub,
          email: userDetails.email,
          username: userDetails.username,
          address: userDetails.address,
          lastLoggedIn: new Date().toISOString(),
          roles: ['VERIFIED'],
          accessToken,
        },
        where: { authId: userDetails.sub },
      })

      return user
    } catch {
      throw new Error(
        'There was a problem logging in. Do you have an existing account with this email?'
      )
    }
  } catch (e) {
    logger.error(e)
    throw e
  }
}

export const provider = {
  urlAuthorize: KEYP_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
