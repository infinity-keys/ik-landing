import { Prisma } from '@prisma/client'
import type {
  QueryResolvers,
  MutationResolvers,
  SubmissionRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'

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

export const Submission: SubmissionRelationResolvers = {
  puzzle: (_obj, { root }) => {
    return db.submission.findUnique({ where: { id: root?.id } }).puzzle()
  },
  user: (_obj, { root }) => {
    return db.submission.findUnique({ where: { id: root?.id } }).user()
  },
}
