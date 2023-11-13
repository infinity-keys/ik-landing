import type { APIGatewayEvent } from 'aws-lambda'

import {
  verifyEvent,
  VerifyOptions,
  WebhookVerificationError,
} from '@redwoodjs/api/webhooks'

import { logger } from 'src/lib/logger'

const CLERK_WEBHOOK_SECRET_KEY = process.env.CLERK_WEBHOOK_SECRET_KEY

if (!CLERK_WEBHOOK_SECRET_KEY) {
  throw new Error('Missing Clerk webhook API key.')
}

export const handler = async (event: APIGatewayEvent) => {
  if (!event.body || event.httpMethod !== 'POST') {
    return {
      statusCode: 403,
    }
  }

  const clerkInfo = { webhook: 'clerk' }
  const webhookLogger = logger.child({ clerkInfo })

  webhookLogger.trace('Invoked clerkWebhook function')

  try {
    const options: VerifyOptions = {
      signatureHeader: 'svix-signature',
      signatureTransformer: (signature: string) => {
        // Clerk can pass a space separated list of signatures.
        // Let's just use the first one that's of version 1
        const passedSignatures = signature.split(' ')

        for (const versionedSignature of passedSignatures) {
          const [version, signature] = versionedSignature.split(',')

          if (version === 'v1') {
            return signature
          }
        }

        webhookLogger.error('No v1 signature found in /auth', signature)
        throw new Error('No v1 signature found')
      },
    }

    const svix_id = event.headers['svix-id']
    const svix_timestamp = event.headers['svix-timestamp']

    verifyEvent('base64Sha256Verifier', {
      event,
      secret: CLERK_WEBHOOK_SECRET_KEY.slice(6),
      payload: `${svix_id}.${svix_timestamp}.${event.body}`,
      options,
    })

    const payload = JSON.parse(event.body)

    // Safely use the validated webhook payload

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: JSON.stringify({
        data: payload,
      }),
    }
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      webhookLogger.warn('Unauthorized')

      return {
        statusCode: 401,
      }
    } else {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error ocurred in /auth'

      webhookLogger.error('Error in /auth', errorMessage)

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 500,
        body: JSON.stringify({
          error: errorMessage,
        }),
      }
    }
  }
}
