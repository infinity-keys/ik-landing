import { APIGatewayEvent } from 'aws-lambda'

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

    const params = event.queryStringParameters

    if (!params || !params.address) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Bad request. Please provide an "address" parameter.',
        }),
      }
    }

    const result = 'yay'

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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
