import type {
  QueryResolvers,
  MutationResolvers,
  SubmissionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const submissions: QueryResolvers['submissions'] = () => {
  return db.submission.findMany()
}

export const submission: QueryResolvers['submission'] = ({ id }) => {
  return db.submission.findUnique({
    where: { id },
  })
}

export const createSubmission: MutationResolvers['createSubmission'] = ({
  input,
}) => {
  return db.submission.create({
    data: input,
  })
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
