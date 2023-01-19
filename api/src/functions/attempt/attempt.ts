import type { APIGatewayEvent } from 'aws-lambda'
import cookie from 'cookie'
import { z } from 'zod'

import { useRequireAuth } from '@redwoodjs/graphql-server'

import { isAuthenticated, getCurrentUser } from 'src/lib/auth'
import {
  compressAndEncryptText,
  decryptAndDecompressText,
} from 'src/lib/encoding/encoding'
import { logger } from 'src/lib/logger'
import { makeAttempt } from 'src/services/ik/attempts/attempts'

const puzzleCookieName = `ik-puzzles`

const PuzzlesData = z.object({
  version: z.string(),
  puzzles: z.record(
    z.string().min(1),
    z.object({ steps: z.array(z.string().min(1)).min(1) })
  ),
})

type PuzzlesDataType = z.TypeOf<typeof PuzzlesData>

const decryptCookie = (data: string | undefined) => {
  return data && JSON.parse(decryptAndDecompressText(data))
}

const getSteps = (completed: PuzzlesDataType, puzzle: string, step: string) => {
  const steps = new Set(
    completed && completed.puzzles[puzzle]
      ? completed.puzzles[puzzle].steps
      : []
  )
  steps.add(step)
  return steps
}

const buildCookieData = (
  completed: PuzzlesDataType,
  puzzle: string,
  steps: Set<string>
) => {
  return {
    version: 'v1',
    puzzles: {
      ...(completed?.puzzles || {}),
      [puzzle]: {
        ...(completed?.puzzles[puzzle] || {}),
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

  const { puzzleId, step, stepId } = event.queryStringParameters

  // Garbage request, bail
  if (!puzzleId || !step || !stepId) {
    logger.info('/attempt called without puzzle or step')
    return { statusCode: 400 }
  }

  logger.info(
    `Invoked '/attempt' function for puzzle ${puzzleId} and step ${step}`
  )
  const isFirstStep = parseInt(step, 10) === 1

  // Everyone (who is logged in) can attempt the first step
  if (isFirstStep) {
    if (!isAuthenticated()) {
      logger.info('Attempted first step without being logged in')
      return { statusCode: 403 }
    }
    // Aight, what's did they guess?
    const { attempt } = JSON.parse(event.body)

    const { success } = await makeAttempt({
      stepId,
      data: { simpleTextSolution: attempt },
    })

    // @TODO: work out cookie headers required here
    if (success) {
      // Access our cookie raw cyphertext
      const puzzlesCompletedCypherText = cookie.parse(event.headers.cookie)[
        puzzleCookieName
      ]

      // @TODO: try/catch here
      const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)

      if (puzzlesCompleted) {
        PuzzlesData.parse(puzzlesCompleted)
      }

      const steps = getSteps(puzzlesCompleted, puzzleId, stepId)
      const stepsCompleted = buildCookieData(puzzlesCompleted, puzzleId, steps)

      const cyphertext = compressAndEncryptText(JSON.stringify(stepsCompleted))

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          // @TODO: DO COOKIE HERE
          'Set-Cookie': cookie.serialize(puzzleCookieName, cyphertext, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          }),
        },
        body: JSON.stringify({ success }),
      }
    }
    // Womp womp
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success }),
    }
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
    const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)
    PuzzlesData.parse(puzzlesCompleted)

    const steps = getSteps(puzzlesCompleted, puzzleId, stepId)

    const thisPuzzle = puzzlesCompleted.puzzles[puzzleId]
    // No record for this puzzle, and since this isn't the first step, bail
    if (!thisPuzzle) {
      logger.info(
        `Since this isn't the first step (${step}), we need at least a record for this puzzle (${puzzleId})`
      )
      return { statusCode: 400 }
    }

    // trying to check a step they aren't allowed to see
    const lastSolve = puzzlesCompleted.puzzles[puzzleId].steps.length
    if (parseInt(step, 10) > lastSolve + 1) {
      logger.info(`Attempted to solve step without required previous steps`)
      return { statusCode: 400 }
    }

    const { attempt } = JSON.parse(event.body)

    const { success } = await makeAttempt({
      stepId,
      data: { simpleTextSolution: attempt },
    })

    if (!success) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success }),
      }
    }
    // @DEV: temp testing cookie
    const stepsCompleted = buildCookieData(puzzlesCompleted, puzzleId, steps)

    const cyphertext = compressAndEncryptText(JSON.stringify(stepsCompleted))

    // @TODO: return different headers based on if we got this right or not
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie.serialize(puzzleCookieName, cyphertext, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        }),
      },
      body: JSON.stringify({ success }),
    }
  }
}

export const handler = useRequireAuth({
  handlerFn: attemptHandler,
  getCurrentUser,
})
