import type { UserWebhookEvent } from '@clerk/clerk-sdk-node'
import type { APIGatewayEvent } from 'aws-lambda'

import {
  verifyEvent,
  VerifyOptions,
  WebhookVerificationError,
} from '@redwoodjs/api/webhooks'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const CLERK_WEBHOOK_SECRET_KEY = process.env.CLERK_WEBHOOK_SECRET_KEY

if (!CLERK_WEBHOOK_SECRET_KEY) {
  throw new Error('Missing Clerk webhook API key.')
}

export const handler = async (event: APIGatewayEvent) => {
  const webhookLogger = logger.child({ webhook: 'clerk' })
  webhookLogger.trace('Invoked clerkWebhook function')

  if (event.httpMethod !== 'POST') {
    webhookLogger.error(`Invalid http method: ${event.httpMethod}`)
    return { statusCode: 405 }
  }

  if (!event.body) {
    webhookLogger.error('Request received with missing body')
    return { statusCode: 422 }
  }

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

    // Throws `WebhookVerificationError` if not successful
    verifyEvent('base64Sha256Verifier', {
      event,
      // Clerk's webhook secrets are prefixed with "whsec_"
      secret: CLERK_WEBHOOK_SECRET_KEY.slice(6),
      payload: `${svix_id}.${svix_timestamp}.${event.body}`,
      options,
    })

    const payload: UserWebhookEvent = JSON.parse(event.body)

    if (payload.type !== 'user.created') {
      webhookLogger.warn(
        `Invalid payload type: "${payload.type}" sent to functions/auth`
      )
      return { statusCode: 400 }
    }

    const { data } = payload

    // Handle users singing up with a social account
    if (data.primary_email_address_id) {
      const primaryEmail = data.email_addresses.find(
        ({ id }) => id === data.primary_email_address_id
      )?.email_address

      await db.user.upsert({
        where: { email: primaryEmail },
        create: {
          email: primaryEmail,
          authId: data.id,
        },
        // Overwrite Keyp id with Clerk id
        update: { authId: data.id },
      })

      return { statusCode: 200 }
    }

    // Handle users singing up with a Metamask wallet
    if (data.primary_web3_wallet_id) {
      const primaryWallet = data.web3_wallets.find(
        ({ id }) => id === data.primary_web3_wallet_id
      )?.web3_wallet

      // External addresses are not unique
      const user = await db.user.findFirst({
        where: {
          externalAddress: {
            equals: primaryWallet,
            // Clerk addresses are lowercase
            mode: 'insensitive',
          },
        },
        select: { id: true },
      })

      await db.user.upsert({
        where: { id: user?.id || '' },
        create: { authId: data.id },
        // Overwrite Keyp id with Clerk id
        update: { authId: data.id },
      })
      return { statusCode: 200 }
    }

    return { statusCode: 200 }
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      webhookLogger.warn('Unauthorized')

      return { statusCode: 401 }
    } else {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error ocurred in /auth'

      webhookLogger.error('Error in /auth', errorMessage)

      return { statusCode: 500 }
    }
  }
}
