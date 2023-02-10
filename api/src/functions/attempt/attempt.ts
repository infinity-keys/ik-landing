import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import type { APIGatewayEvent } from 'aws-lambda'
import cookie from 'cookie'
import { z } from 'zod'

import { context } from '@redwoodjs/graphql-server'
import { useRequireAuth } from '@redwoodjs/graphql-server'

import { getCurrentUser } from 'src/lib/auth'
import {
  compressAndEncryptText,
  decryptCookie,
} from 'src/lib/encoding/encoding'
import { logger } from 'src/lib/logger'
import { makeAttempt } from 'src/services/ik/attempts/attempts'

const PuzzlesData = z.object({
  version: z.string().min(1),
  authId: z.string().min(1),
  puzzles: z.record(
    z.string().min(1),
    z.object({ steps: z.array(z.string().min(1)).min(1) })
  ),
})

type PuzzlesDataType = z.TypeOf<typeof PuzzlesData>

const buildCookieData = ({
  completed,
  puzzleId,
  authId,
  stepId,
}: {
  completed: PuzzlesDataType
  puzzleId: string
  authId: string
  stepId: string
}) => {
  const steps = new Set(
    completed && completed.puzzles[puzzleId]
      ? completed.puzzles[puzzleId].steps
      : []
  ).add(stepId)

  return {
    version: 'v1',
    authId,
    puzzles: {
      ...(completed?.puzzles || {}),
      [puzzleId]: {
        ...(completed?.puzzles[puzzleId] || {}),
        steps: [...steps],
      },
    },
  }
}

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
  // We only accept POST requests
  const { httpMethod } = event
  if (httpMethod !== 'POST') return { statusCode: 405 }

  // Check that the referer is from the puzzle page
  const { referer } = event.headers
  const refererUrl = new URL(referer)
  if (!refererUrl.pathname.includes('/puzzle/')) {
    logger.info('/attempt called from non-puzzle page')
    return { statusCode: 403 }
  }

  const { puzzleId, stepParam, stepId } = event.queryStringParameters

  // Garbage request, bail
  if (!puzzleId || !stepParam || !stepId) {
    logger.info('/attempt called without puzzle or step')
    return { statusCode: 400 }
  }

  const stepNum = parseInt(stepParam, 10)

  logger.info(
    `Invoked '/attempt' function for puzzle ${puzzleId} and step ${stepNum}`
  )
  const isFirstStep = stepNum === 1

  // Everyone (who is logged in) can attempt the first step
  if (isFirstStep) {
    if (!context.currentUser.authId) {
      logger.info('Attempted first step without being logged in')
      return { statusCode: 403 }
    }

    // Access our cookie raw cyphertext
    const puzzlesCompletedCypherText = cookie.parse(event.headers.cookie)[
      PUZZLE_COOKIE_NAME
    ]

    // @TODO: try/catch here
    const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)

    // trying to solve step more than once
    if (puzzlesCompleted?.puzzles[puzzleId]?.steps.includes(stepId)) {
      console.log('alread dun')
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'You have already completed this step',
        }),
      }
    }
    // Aight, what's did they guess?
    const { attempt } = JSON.parse(event.body)

    const { success, finalStep, message } = await makeAttempt({
      stepId,
      data: attempt,
    })

    // @TODO: work out cookie headers required here
    if (success) {
      if (puzzlesCompleted) {
        PuzzlesData.parse(puzzlesCompleted)
        if (puzzlesCompleted.authId !== context.currentUser.authId) {
          return { statusCode: 403 }
        }
      }

      const stepsCompleted = buildCookieData({
        completed: puzzlesCompleted,
        puzzleId,
        authId: context.currentUser.authId,
        stepId,
      })

      const cyphertext = compressAndEncryptText(JSON.stringify(stepsCompleted))

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          // @TODO: DO COOKIE HERE
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
    // Womp womp
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success, message }),
    }
  }

  // Access our cookie raw cyphertext
  const puzzlesCompletedCypherText = cookie.parse(event.headers.cookie)[
    PUZZLE_COOKIE_NAME
  ]

  // Only the first step is allowed to be attempted without any prior solves (no cookie)
  if (!isFirstStep && !puzzlesCompletedCypherText) {
    logger.info(`Non-first step (${stepNum}) attempted without cookie`)
    return { statusCode: 400 }
  }

  // We can safely parse the cookie to discover what a user has actually solved
  if (!isFirstStep && puzzlesCompletedCypherText) {
    if (!context.currentUser.authId) {
      logger.info('Attempted first step without being logged in')
      return { statusCode: 403 }
    }

    // @TODO: try/catch here
    const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)
    PuzzlesData.parse(puzzlesCompleted)

    if (puzzlesCompleted.authId !== context.currentUser.authId) {
      return { statusCode: 403 }
    }

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

    // trying to solve step more than once
    if (puzzlesCompleted.puzzles[puzzleId].steps.includes(stepId)) {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'You have already completed this step',
        }),
      }
    }

    const { attempt } = JSON.parse(event.body)

    const { success, finalStep, message } = await makeAttempt({
      stepId,
      data: attempt,
    })

    if (!success) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success, message }),
      }
    }

    const stepsCompleted = buildCookieData({
      completed: puzzlesCompleted,
      puzzleId,
      authId: context.currentUser.authId,
      stepId,
    })

    const cyphertext = compressAndEncryptText(JSON.stringify(stepsCompleted))

    // @TODO: return different headers based on if we got this right or not
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
}

export const handler = useRequireAuth({
  handlerFn: attemptHandler,
  getCurrentUser,
})
