import cookie from 'cookie'
import type { MutationResolvers } from 'types/graphql'

import { discordConnect } from 'src/lib/connectAccounts/accounts/discord'

export const connectAccount: MutationResolvers['connectAccount'] = async (
  { code, state },
  obj
) => {
  try {
    const ctx = obj?.context

    if (!ctx?.event || !context?.currentUser?.id) {
      return { success: false, errors: ['Error retrieving account'] }
    }

    const cookieState = cookie.parse(ctx.event.headers.cookie || '')['state']

    if (!cookieState || cookieState !== state) {
      return {
        success: false,
        errors: ['Invalid state'],
      }
    }

    // @TODO: use provider lookup
    const { refreshToken, accessToken } = await discordConnect.exchangeToken(
      code
    )

    const { id } = await discordConnect.getProfile(accessToken)
    const connection = await discordConnect.upsertConnection(
      id,
      accessToken,
      refreshToken
    )

    return {
      success: 'id' in connection,
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      errors: ['Error connecting account'],
    }
  }
}
