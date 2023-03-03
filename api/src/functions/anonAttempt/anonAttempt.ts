import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import type { APIGatewayEvent } from 'aws-lambda'
import cookie from 'cookie'

import { checkAnonSolution, isAnonPuzzle } from 'src/lib/anonAttempt'
import { buildCookieData, PuzzlesData } from 'src/lib/cookie'
import {
  compressAndEncryptText,
  decryptCookie,
} from 'src/lib/encoding/encoding'
import { logger } from 'src/lib/logger'

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
export const handler = async (event: APIGatewayEvent) => {
  logger.info('Invoked anonAttempt function')

  const { httpMethod } = event
  if (httpMethod !== 'POST') return { statusCode: 405 }

  // Check that the referer is from the puzzle page
  const { referer } = event.headers
  const refererUrl = new URL(referer)
  if (!refererUrl.pathname.includes('/puzzle/')) {
    logger.info('/anonAttempt called from non-puzzle page')
    return { statusCode: 403 }
  }

  if (context.currentUser) {
    logger.info('This route is for unauthenticated users.')
    return { statusCode: 403 }
  }

  const { puzzleId, stepParam, stepId } = event.queryStringParameters

  // Garbage request, bail
  if (!puzzleId || !stepParam || !stepId) {
    logger.info('/anonAttempt called without puzzle or step')
    return { statusCode: 400 }
  }

  const stepNum = parseInt(stepParam, 10)

  logger.info(
    `Invoked '/anonAttempt' function for puzzle ${puzzleId} and step ${stepNum}`
  )

  const isFirstStep = stepNum === 1

  // first check for anon puzzle
  const isAnonymous = await isAnonPuzzle({ puzzleId })

  if (!isAnonymous) {
    logger.info('You must sign in to play this puzzle.')
    return { statusCode: 403 }
  }

  const { attempt } = JSON.parse(event.body)

  // @NOTE: if there are no cookies, this will break if it's not passed a string
  const puzzlesCompletedCypherText = cookie.parse(event.headers.cookie || '')[
    PUZZLE_COOKIE_NAME
  ]

  const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)
  puzzlesCompleted && PuzzlesData.parse(puzzlesCompleted)

  // trying to solve step more than once
  if (puzzlesCompleted?.puzzles[puzzleId]?.steps.includes(stepId)) {
    return {
      statusCode: 403,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'You have already completed this step',
      }),
    }
  }

  if (!isFirstStep && !puzzlesCompletedCypherText) {
    logger.info(`Non-first step (${stepNum}) attempted without cookie`)
    return { statusCode: 400 }
  }

  // if it isn't the first step, they should have a cookie
  if (!isFirstStep) {
    const thisPuzzle = puzzlesCompleted.puzzles[puzzleId]
    // No record for this puzzle, and since this isn't the first step, bail
    if (!thisPuzzle) {
      logger.info(
        `Since this isn't the first step (${stepNum}), we need at least a record for this puzzle (${puzzleId})`
      )
      return { statusCode: 400 }
    }

    // trying to check a step they aren't allowed to see
    const visibleSteps = puzzlesCompleted.puzzles[puzzleId].steps.length + 1
    if (stepNum > visibleSteps) {
      logger.info(`Attempted to solve step without required previous steps`)
      return { statusCode: 400 }
    }
  }

  const { success, finalStep } = await checkAnonSolution({
    puzzleId,
    stepId,
    attempt,
  })

  if (!success) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success, message: "That's not it." }),
    }
  }

  // @TODO: how to write anon cookie with no authId
  const stepsCompleted = buildCookieData({
    completed: puzzlesCompleted,
    puzzleId,
    authId: 'ANON',
    stepId,
  })

  const cyphertext = compressAndEncryptText(JSON.stringify(stepsCompleted))

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie.serialize(PUZZLE_COOKIE_NAME, cyphertext, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      }),
    },
    body: JSON.stringify({ success, finalStep }),
  }
}
