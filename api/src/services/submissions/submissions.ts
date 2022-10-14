import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { IK_CLAIMS_NAMESPACE } from 'src/lib/constants'
import { db } from 'src/lib/db'
import { verifyToken } from 'src/lib/jwt'
import { IkJwt } from 'src/lib/types'

import { sendEmail } from '../email/email-submission'

export const submissions: QueryResolvers['submissions'] = () => {
  return db.submission.findMany()
}

export const submission: QueryResolvers['submission'] = ({ submissionId }) => {
  return db.submission.findUnique({
    where: { submissionId },
  })
}

export const createSubmission: MutationResolvers['createSubmission'] = async ({
  input,
}) => {
  // throws error if not formatted like an email
  if (input.email) validate(input.email, 'email', { email: true })

  const results = await db.submission.create({
    data: input,
  })

  if (input.email) {
    sendEmail({
      email: input.email,
      puzzleId: input.puzzleId,
      userId: input.userId,
    })
  }

  return results
}

export const updateSubmission: MutationResolvers['updateSubmission'] = ({
  submissionId,
  input,
}) => {
  return db.submission.update({
    data: input,
    where: { submissionId },
  })
}

export const deleteSubmission: MutationResolvers['deleteSubmission'] = ({
  submissionId,
}) => {
  return db.submission.delete({
    where: { submissionId },
  })
}

// @TODO: this should probably be in its own file since it's deleting
// submissions and users
export const deleteSubmissionsByEmail: MutationResolvers['deleteSubmissionsByEmail'] =
  async ({ jwt }) => {
    const verified = await verifyToken(jwt)
    const payload = verified.payload as unknown as IkJwt

    const { sub: userId } = payload
    const { email } = payload.claims[IK_CLAIMS_NAMESPACE]

    await db.submission.deleteMany({
      where: { OR: [{ email }, { userId }] },
    })

    await db.user.delete({
      where: { userId },
    })

    return { success: true }
  }
