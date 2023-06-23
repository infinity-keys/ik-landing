import cookie from 'cookie'
import type { MutationResolvers } from 'types/graphql'

import {
  upsertConnection,
  createTokenExchangeBody,
} from 'src/lib/connectAccounts/accounts/discord'
import { db } from 'src/lib/db'
import { compressAndEncryptText } from 'src/lib/encoding/encoding'

export const connectAccount: MutationResolvers['connectAccount'] = async ({
  code,
  state,
  provider,
}) => {
  try {
    const encryptedState = cookie.parse(context.event.headers.cookie || '')[
      'discordState'
    ]
    const cookieState = encryptedState

    if (cookieState !== state) {
      console.log('state wrong')
      return {
        success: false,
      }
    }

    if (!context?.currentUser?.id) {
      return {
        success: false,
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
    }
  }
}
