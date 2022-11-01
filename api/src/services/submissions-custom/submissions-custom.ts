import type { MutationResolvers } from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import { sendEmail } from '../email/email-submission'

export const createSubmissionWithOptionalEmail: MutationResolvers['createSubmissionWithOptionalEmail'] =
  async ({ input }) => {
    // throws error if not formatted like an email
    if (
      typeof input.data === 'object' &&
      'email' in input.data &&
      typeof input.data.email === 'string'
    ) {
      validate(input.data.email, 'email', { email: true })
    }

    const results = await db.submission.create({
      data: input,
    })

    if (
      typeof input.data === 'object' &&
      'email' in input.data &&
      typeof input.data.email === 'string'
    ) {
      sendEmail({
        email: String(input.data.email),
        puzzleId: input.puzzleId,
        userId: input.userId,
      })
    }

    return results
  }
