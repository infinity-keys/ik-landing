import { APIGatewayEvent } from 'aws-lambda'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event: APIGatewayEvent) => {
  try {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: 'Method not allowed. This endpoint accepts only GET requests.',
        }),
      }
    }

    const { address } = event.queryStringParameters || {}

    if (!address) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Bad request. Please provide an "address" parameter.',
        }),
      }
    }

    const results = await db.lensKeypConnection.findMany({
      where: {
        lensAddress: address,
      },
      select: {
        keypAddress: true,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(results.map(({ keypAddress }) => keypAddress)),
    }
  } catch (e) {
    logger.error('Error in /lens-lookup', e)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process your request.',
      }),
    }
  }
}
