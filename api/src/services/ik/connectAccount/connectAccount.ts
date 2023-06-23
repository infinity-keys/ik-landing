import cookie from 'cookie'
import type { MutationResolvers } from 'types/graphql'

import {
  upsertConnection,
  createTokenExchangeBody,
} from 'src/lib/connectAccounts/accounts/discord'
import { db } from 'src/lib/db'
import { compressAndEncryptText } from 'src/lib/encoding/encoding'

export const connectAccount: MutationResolvers['connectAccount'] = async (
  { code, state, provider },
  obj
) => {
  try {
    const ctx = obj?.context

    if (!ctx?.event) {
      return { success: false, errors: ['Error connecting account'] }
    }

    const cookieState = cookie.parse(ctx.event.headers.cookie || '')['state']

    if (cookieState !== state) {
      return {
        success: false,
        errors: ['Invalid state'],
      }
    }

    if (!context?.currentUser?.id) {
      return {
        success: false,
        errors: ['Must be logged in.'],
      }
    }

    const res = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: createTokenExchangeBody(code),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const data = await res.json()
    console.log('data: ', data)

    const infores = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    })
    const infoData = await infores.json()

    // @TODO: should discordIds be unique
    const connection = await upsertConnection({
      refreshToken: compressAndEncryptText(data.refresh_token),
      accessToken: compressAndEncryptText(data.access_token),
      discordId: infoData.id,
      userId: context.currentUser.id,
    })

    console.log(connection)

    return {
      success: true,
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      errors: ['Error connecting account'],
    }
  }
}
