import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

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
  if (input.data?.email) validate(input.data.email, 'email', { email: true })

  const results = await db.submission.create({
    data: input,
  })

  if (input.data?.email) {
    sendEmail({
      email: input.data.email as string,
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
