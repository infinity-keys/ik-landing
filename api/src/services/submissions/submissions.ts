import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

import { sendEmail } from '../email/email-submission'

export const submissions: QueryResolvers['submissions'] = () => {
  return db.submission.findMany()
}

export const submission: QueryResolvers['submission'] = ({ id }) => {
  return db.submission.findUnique({
    where: { id },
  })
}

export const createSubmission: MutationResolvers['createSubmission'] = async ({
  input,
}) => {
  const results = await db.submission.create({
    data: input,
  })

  if (input.email) {
    sendEmail({
      email: input.email,
      puzzleId: input.puzzleId,
    })
  }

  return results
}

export const updateSubmission: MutationResolvers['updateSubmission'] = ({
  id,
  input,
}) => {
  return db.submission.update({
    data: input,
    where: { id },
  })
}

export const deleteSubmission: MutationResolvers['deleteSubmission'] = ({
  id,
}) => {
  return db.submission.delete({
    where: { id },
  })
}
