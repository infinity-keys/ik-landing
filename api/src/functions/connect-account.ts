import { APIGatewayEvent } from 'aws-lambda'
import { nanoid } from 'nanoid'

import { createAuthUrl } from 'src/lib/connectAccounts/accounts/discord'

export const handler = async (event: APIGatewayEvent) => {
  const { provider } = event.queryStringParameters || {}
  console.log(provider)
  const state = nanoid(15)

  // @TODO: make this flexible
  const authUrl = createAuthUrl(state)

  return {
    statusCode: 200,
    headers: {
      // @TODO: use cookie the library
      'Set-Cookie': `discordState=${state}; HttpOnly; SameSite=Lax; Max-Age=3600`,
    },
    body: JSON.stringify({
      authUrl: authUrl.toString(),
    }),
  }
}
