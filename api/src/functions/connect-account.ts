import { APIGatewayEvent } from 'aws-lambda'
import cookie from 'cookie'
import { nanoid } from 'nanoid'

import { authDecoder } from '@redwoodjs/auth-dbauth-api'
import { useRequireAuth } from '@redwoodjs/graphql-server'

import { getCurrentUser, isAuthenticated } from 'src/lib/auth'
import { discordConnect } from 'src/lib/connectAccounts/accounts/discord'
import { makeStateToken } from 'src/lib/jwt'

const connectAccount = async (event: APIGatewayEvent) => {
  if (!isAuthenticated()) {
    return {
      statusCode: 401,
    }
  }

  const { provider } = event.queryStringParameters || {}

  if (!provider) {
    return {
      statusCode: 400,
    }
  }

  // TODO: tie to session somehow?
  const state = nanoid(15)
  const stateToken = await makeStateToken(state)

  // @TODO: use provider lookup
  const authUrl = discordConnect.generateAuthUrl(state)

  const stateCookie = cookie.serialize('stateToken', stateToken, {
    httpOnly: true,
    secure: true,
    maxAge: 600, // 10 minutes
    sameSite: 'strict',
    path: '/',
  })

  return {
    statusCode: 200,
    headers: { 'Set-Cookie': stateCookie },
    body: JSON.stringify({
      authUrl: authUrl.toString(),
    }),
  }
}

export const handler = useRequireAuth({
  handlerFn: connectAccount,
  getCurrentUser,
  authDecoder,
})
