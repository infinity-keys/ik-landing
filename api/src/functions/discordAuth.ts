// api/src/functions/discordAuth.ts

import { URL } from 'url'

import { compressAndEncryptText } from 'src/lib/encoding/encoding'
import { discordStrategy } from 'src/lib/passport'

export const handler = async (event, context) => {
  const strategy = discordStrategy()

  const state = encodeURIComponent(Math.random().toString(36).substring(2, 15))
  console.log('state: ', state)

  const url = new URL('https://discord.com/api/oauth2/authorize')
  url.searchParams.append('client_id', strategy._oauth2._clientId)
  url.searchParams.append('redirect_uri', strategy._callbackURL)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('scope', strategy._scope.join(' '))
  url.searchParams.append('state', state)

  return {
    statusCode: 302,
    headers: {
      'Set-Cookie': `state=${compressAndEncryptText(
        state
      )}; HttpOnly; SameSite=Lax; Max-Age=3600`,
      Location: url.toString(),
    },
    body: '',
  }
}
