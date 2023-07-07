import cookie from 'cookie'
import { capitalize } from 'lodash'
import type { MutationResolvers } from 'types/graphql'

import { discordConnect } from 'src/lib/connectAccounts/accounts/discord'
import { verifyToken } from 'src/lib/jwt'
import { logger } from 'src/lib/logger'

export const connectAccount: MutationResolvers['connectAccount'] = async (
  { code, state, provider },
  obj
) => {
  logger.info('Invoked /connectAccounts')

  try {
    const ctx = obj?.context

    if (!ctx?.event || !context?.currentUser?.id) {
      logger.error('Error retrieving account /connectAccounts')
      return { success: false, errors: ['Error retrieving account'] }
    }

    const token = cookie.parse(ctx.event.headers.cookie || '')['stateToken']
    const cookieState = await verifyToken(token)

    if (!cookieState || cookieState.payload.state !== state) {
      logger.error('Invalid state /connectAccounts')
      return {
        success: false,
        errors: ['Invalid state'],
      }
    }

    // @TODO: use provider lookup
    const { refreshToken, accessToken } = await discordConnect.exchangeToken(
      code
    )

    const profile = await discordConnect.getProfile(accessToken)
    await discordConnect.upsertConnection({
      profileId: profile.id,
      accessToken,
      refreshToken,
      data: profile,
    })

    return {
      success: true,
    }
  } catch (e) {
    logger.error('Error in connectAccount', e)

    const defaultMessage = `An error occurred while trying to connect your ${
      provider ? `${capitalize(provider)} account` : 'account'
    }`

    return {
      success: false,
      errors: [defaultMessage, ...(e instanceof Error ? [e.message] : [])],
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

      return {
        success: false,
        errors: [defaultMessage, ...(e instanceof Error ? [e.message] : [])],
      }
    }
  }
