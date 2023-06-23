import { db } from 'src/lib/db'

const clientId = process.env.DISCORD_TEST_CLIENT
const clientSecret = process.env.DISCORD_TEST_SECRET
const redirectUri = 'http://localhost:8910/connect-accounts?provider=discord'

export const createAuthUrl = (state: string) => {
  if (!clientId || !redirectUri) {
    throw new Error('No client ID provided.')
  }
  const url = new URL('https://discord.com/api/oauth2/authorize')
  url.searchParams.append('client_id', clientId)
  url.searchParams.append('redirect_uri', redirectUri)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('scope', 'identify guilds')
  url.searchParams.append('state', state)

  return url
}

export const createTokenExchangeBody = (code: string) => {
  if (!clientSecret || !clientId) {
    throw new Error('No code parameter provided.')
  }

  const query = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
  }

  const params = new URLSearchParams(query).toString()

  return params
}

export const upsertConnection = async ({
  userId,
  accessToken,
  refreshToken,
  discordId,
}: {
  userId: string
  accessToken: string
  refreshToken: string
  discordId: string
}) => {
  return db.discordConnection.upsert({
    where: {
      userId,
    },
    create: {
      accessToken,
      refreshToken,
      discordId,
      userId,
    },
    update: {
      accessToken,
      refreshToken,
      discordId,
    },
  })
}

export const refreshAccessToken = async (refreshToken: string) => {
  if (!clientSecret || !clientId) {
    throw new Error('No code parameter provided.')
  }

  const query = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }

  const params = new URLSearchParams(query).toString()

  const res = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  const data = await res.json()

  return data
}
