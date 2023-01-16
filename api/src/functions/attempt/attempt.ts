import type { APIGatewayEvent } from 'aws-lambda'
import cookie from 'cookie'
import aes from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

import { useRequireAuth } from '@redwoodjs/graphql-server'

import { isAuthenticated, getCurrentUser } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

const puzzleCookieName = `ik-puzzles`

/**
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
const attemptHandler = async (event: APIGatewayEvent) => {
  console.log(process.env.INFINITY_KEYS_SECRET)

  // @TODO: make this dynamic, no hardcoding
  // @example: localhost:8910/.redwood/functions/attempt
  let path = '/.redwood/functions/attempt'
  if (process.env.NODE_ENV === 'production') {
    // @example: api.infinitykeys.io/attempt
    path = '/attempt'
  }

  // Check that the referer is from the puzzle page
  const { referer } = event.headers
  const refererUrl = new URL(referer)
  if (!refererUrl.pathname.includes('/puzzle/')) {
    logger.info('/attempt called from non-puzzle page')
    return { statusCode: 403 }
  }

  const { puzzle, step } = event.queryStringParameters
  // Garbage request, bail
  if (!puzzle || !step) {
    logger.info('/attempt called without puzzle or step')
    return { statusCode: 400 }
  }

  logger.info(
    `Invoked '/attempt' function for puzzle ${puzzle} and step ${step}`
  )
  const isFirstStep = parseInt(step, 10) === 1

  // Everyone (who is logged in) can attempt the first step
  if (isFirstStep) {
    if (!isAuthenticated()) {
      logger.info('Attempted first step without being logged in')
      return { statusCode: 403 }
    }

    // @TODO: graphql attempt call here
    // @TODO: work out cookie headers required here
  }

  // Access our cookie raw cyphertext
  const puzzlesCompletedCypherText = cookie.parse(event.headers.cookie)[
    puzzleCookieName
  ]

  // Only the first step is allowed to be attempted without any prior solves (no cookie)
  if (!isFirstStep && !puzzlesCompletedCypherText) {
    logger.info(`Non-first step (${step}) attempted without cookie`)
    return { statusCode: 400 }
  }

  // We can safely parse the cookie to discover what a user has actually solved
  if (!isFirstStep && puzzlesCompletedCypherText) {
    // @TODO: try/catch here
    const puzzlesCompleted = JSON.parse(
      aes
        .decrypt(puzzlesCompletedCypherText, process.env.INFINITY_KEYS_SECRET)
        .toString(encUtf8)
    )
    console.log({ puzzlesCompleted })

    // @TODO: Zod goes here to validate shape of puzzlesCompleted

    const thisPuzzle = puzzlesCompleted.puzzles[puzzle]
    // No record for this puzzle, and since this isn't the first step, bail
    if (!thisPuzzle) {
      logger.info(
        `Since this isn't the first step (${step}), we need at least a record for this puzzle (${puzzle})`
      )
      return { statusCode: 400 }
    }

    // @TODO: graphql attempt call here
    // @TODO: work out cookie headers required here
  }

  // console.log(event)
  // console.log(event.queryStringParameters)
  // console.log({ isAuthenticated: isAuthenticated() })

  // @DEV: temp testing cookie
  const stepsCompleted = {
    version: 'v1',
    puzzles: {
      [puzzle]: {
        steps: ['1', '2'],
      },
    },
  }
  const cyphertext = aes
    .encrypt(JSON.stringify(stepsCompleted), process.env.INFINITY_KEYS_SECRET)
    .toString()

  // @TODO: return different headers based on if we got this right or not
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie.serialize(puzzleCookieName, cyphertext, {
        path,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      }),
    },
    body: JSON.stringify({
      data: 'attempt function',
    }),
  }
}

export const handler = useRequireAuth({
  handlerFn: attemptHandler,
  getCurrentUser,
})
