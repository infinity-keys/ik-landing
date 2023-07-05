import { DiscordConnection } from 'types/graphql'

import { db } from 'src/lib/db'
import { compressAndEncryptText } from 'src/lib/encoding/encoding'

import { ConnectAccountOauthProvider, ConnectConfig } from '../base'

const clientId = process.env.DISCORD_CONNECT_CLIENT || ''
const clientSecret = process.env.DISCORD_CONNECT_SECRET || ''
const redirectUri = 'http://localhost:8910/connect-accounts?provider=discord'

const config = {
  authUrl: 'https://discord.com/api/oauth2/authorize',
  tokenUrl: 'https://discord.com/api/oauth2/token',
  redirectUrl: redirectUri,
  profileUrl: 'https://discord.com/api/users/@me',
  authUrlParams: {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identify',
  },
  tokenExchangeBody: {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  },
}

export class DiscordConnect extends ConnectAccountOauthProvider<
  Partial<DiscordConnection>
> {
  tokenExchangeBody: Record<string, string>

  constructor({
    authUrl,
    tokenUrl,
    profileUrl,
    authUrlParams,
    tokenExchangeBody,
  }: ConnectConfig & { tokenExchangeBody: Record<string, string> }) {
    super({ authUrl, tokenUrl, profileUrl, authUrlParams })
    this.tokenExchangeBody = tokenExchangeBody
  }

  async exchangeToken(code: string) {
    if (
      !this.tokenExchangeBody.client_id ||
      !this.tokenExchangeBody.client_secret ||
      !code
    ) {
      throw new Error('Missing parameters in token exchange')
    }

    const params = new URLSearchParams(this.tokenExchangeBody)
    params.append('code', code)

    const res = await fetch(this.tokenUrl, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const { refresh_token, access_token } = await res.json()

    if (typeof refresh_token !== 'string' || typeof access_token !== 'string') {
      throw new Error('Tokens missing from token exchange response')
    }

    return { refreshToken: refresh_token, accessToken: access_token }
  }

  async getProfile(accessToken: string): Promise<Record<string, string>> {
    if (!accessToken) {
      throw new Error('Missing user access token')
    }

    const profileRes = await fetch(this.profileUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (profileRes.status !== 200) {
      throw new Error('Error obtaining Discord profile')
    }

    const data = await profileRes.json()
    return data
  }

  async upsertConnection(
    profileId: string,
    accessToken: string,
    refreshToken: string
  ) {
    if (!accessToken || !refreshToken) {
      throw new Error('Missing tokens')
    }

    if (!context?.currentUser?.id) {
      throw new Error('Must be logged in')
    }

    const connection = await db.discordConnection.upsert({
      where: {
        userId: context.currentUser.id,
      },
      create: {
        accessToken: compressAndEncryptText(refreshToken),
        refreshToken: compressAndEncryptText(accessToken),
        discordId: profileId,
        userId: context.currentUser.id,
      },
      update: {
        accessToken: compressAndEncryptText(refreshToken),
        refreshToken: compressAndEncryptText(accessToken),
        discordId: context.currentUser.id,
      },
    })

    if (!('id' in connection)) {
      throw new Error('Error adding account connection to db')
    }

    return connection
  }

  async deleteConnection() {
    if (!context?.currentUser?.id) {
      throw new Error('Must be logged in')
    }

    const connection = await db.discordConnection.delete({
      where: {
        userId: context.currentUser.id,
      },
    })

    if (!('id' in connection)) {
      throw new Error('Error removing account connection from db')
    }

    return connection
  }
}

export const discordConnect = new DiscordConnect(config)
