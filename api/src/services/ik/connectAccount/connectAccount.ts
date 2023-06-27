import cookie from 'cookie'
import { capitalize } from 'lodash'
import type { MutationResolvers } from 'types/graphql'

import { discordConnect } from 'src/lib/connectAccounts/accounts/discord'
import { logger } from 'src/lib/logger'

export const connectAccount: MutationResolvers['connectAccount'] = async (
  { code, state, provider },
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
    await discordConnect.upsertConnection(id, accessToken, refreshToken)

    return {
      success: true,
    }
  } catch (e) {
    logger.error('Error in connectAccount', e)

    const defaultMessage = `An error occurred while trying to connect your ${
      provider ? `${capitalize(provider)} account` : 'account'
    }`

    if (e instanceof Error) {
      return {
        success: false,
        errors: [defaultMessage, e.message],
      }
    }

    return {
      success: false,
      errors: [defaultMessage],
    }
  }
}

export const deleteAccountConnection: MutationResolvers['deleteAccountConnection'] =
  async ({ provider }) => {
    try {
      await discordConnect.deleteConnection()
      return { success: true }
    } catch (e) {
      logger.error('Error in deleteAccountConnection', e)

      const defaultMessage = `An error occurred while trying to disconnect your ${
        provider ? `${capitalize(provider)} account` : 'account'
      }`

      if (e instanceof Error) {
        return {
          success: false,
          errors: [defaultMessage, e.message],
        }
      }

      return {
        success: false,
        errors: [defaultMessage],
      }
    }
  }
