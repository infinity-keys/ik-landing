import { DbAuthHandler } from '@redwoodjs/auth-dbauth-api'

import { db } from 'src/lib/db'
import { validateLoginRequest } from 'src/lib/keyp/auth/validation'
import { isProduction, cors } from 'src/lib/keyp/helpers'
import { oAuthUrl, submitCodeGrant } from 'src/lib/keyp/oAuth'
import { providers } from 'src/lib/keyp/oAuth/providers'
import { logger } from 'src/lib/logger'

export const handler = async (event, context) => {
  logger.info('Invoked /auth ', { event, context })
  const authHandler = new DbAuthHandler(event, context, {
    db: db,
    cors,
    authModelAccessor: 'user',
    authFields: {
      // @NOTE: this has been changed from `id`
      id: 'authId',
      username: 'username',
    },
    login: {
      handler: (user) => {
        return user
      },
      errors: {
        usernameOrPasswordMissing: 'Both username and password are required',
        usernameNotFound: 'Username ${username} not found',
        incorrectPassword: 'Username ${username} not found',
      },
      // expires: 60 * 60, // 1 hour
      expires: 60 * 60 * 24 * 3, // 3 days
      // expires: 60 * 60 * 24 *30, // 30 days
    },
    signup: {
      handler: () => {
        throw 'signUp is not implemented'
      },
    },
    forgotPassword: {
      // https://community.redwoodjs.com/t/v0-38-upgrade-guide/2501
      handler: () => null,
      expires: 60 * 60 * 24,
      errors: {
        usernameNotFound: 'Error',
        usernameRequired: 'Error',
      },
    },
    resetPassword: {
      handler: () => null,
      allowReusedPassword: false,
      errors: {
        resetTokenExpired: 'This reset token is old, try again',
        resetTokenInvalid: 'This reset token was not found',
        resetTokenRequired: 'You have to include a reset token',
        reusedPassword: 'You must choose a new password',
      },
    },
    cookie: {
      HttpOnly: true,
      Path: '/',
      SameSite: 'Strict',
      Secure: isProduction,
      ...(isProduction && {
        Domain: process.env.APP_DOMAIN.split('://')[1],
      }),
    },
  })

  authHandler.login = async () => {
    const { code, state, type } = authHandler.params
    if (!code || !state) throw 'logIn() Code or state not provided.'
    validateLoginRequest({ type })

    const tokens = await submitCodeGrant({
      state,
      code,
      type,
    })
    const user = await providers[type].onConnected(tokens)
    const sessionData = { id: user[authHandler.options.authFields.id] }

    // TODO: this needs to go into graphql somewhere so that each request makes
    // a new CSRF token and sets it in both the encrypted session and the
    // csrf-token header
    const csrfToken = DbAuthHandler.CSRF_TOKEN

    const response = [
      sessionData,
      {
        'csrf-token': csrfToken,
        ...authHandler._createSessionHeader(sessionData, csrfToken),
      },
    ]
    logger.debug({ custom: response }, 'login() cookie')
    return response
  }

  authHandler.signup = async () => {
    try {
      const { type } = authHandler.params
      logger.debug(`authHandler.signup type: ${type}`)
      validateLoginRequest({ type })
      const { url } = await oAuthUrl(type)
      return [JSON.stringify({ url }), {}, { statusCode: 201 }]
    } catch (e) {
      logger.error(e)
      return [JSON.stringify(e), {}, { statusCode: 500, error: e }]
    }
  }

  return await authHandler.invoke()
}
