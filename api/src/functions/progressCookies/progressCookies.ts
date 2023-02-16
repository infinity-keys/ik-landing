import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import type { APIGatewayEvent, Context } from 'aws-lambda'
import cookie from 'cookie'

import { useRequireAuth } from '@redwoodjs/graphql-server'
import { context } from '@redwoodjs/graphql-server'

import { getCurrentUser } from 'src/lib/auth'
import { compressAndEncryptText } from 'src/lib/encoding/encoding'
import { logger } from 'src/lib/logger'
import { userProgress } from 'src/services/ik/rewardables'

import { buildCookieData, PuzzlesDataType } from '../attempt/attempt'

/**
 * Successfully reconcile cookies from IKv1, Anonymous progress from IKv2, and
 * Authenticated progress from IKv2.
 *
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
const progressCookiesHandler = async (
  event: APIGatewayEvent
  // context: Context
) => {
  // We only accept POST requests
  const { httpMethod } = event
  if (httpMethod !== 'POST') return { statusCode: 405 }

  logger.info(
    'Invoked progressCookies function. This will eventually write all progress to cookies',
    { context }
  )

  // Get user's entire progress
  const progress = await userProgress()
  // Turn this progress into a cookie
  const cookieData = progress.reduce(
    (acc, item) => {
      acc = buildCookieData({
        completed: acc,
        puzzleId: item.puzzleId,
        authId: context.currentUser?.authId,
        stepId: item.id,
      })
      return acc
    },
    {
      version: 'v1',
      authId: context.currentUser?.authId,
      puzzles: {},
    } as PuzzlesDataType
  )

  const progressCookie = compressAndEncryptText(JSON.stringify(cookieData))

  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': cookie.serialize(PUZZLE_COOKIE_NAME, progressCookie, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      }),
      // No JSON, just a response (with a cookie)
      //   'Content-Type': 'application/json',
    },
  }
}

export const handler = useRequireAuth({
  handlerFn: progressCookiesHandler,
  getCurrentUser,
})
