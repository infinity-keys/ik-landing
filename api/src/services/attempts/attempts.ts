import type {
  QueryResolvers,
  MutationResolvers,
  AttemptRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const attempts: QueryResolvers['attempts'] = () => {
  return db.attempt.findMany()
}

export const attempt: QueryResolvers['attempt'] = ({ id }) => {
  return db.attempt.findUnique({
    where: { id },
  })
}

export const createAttempt: MutationResolvers['createAttempt'] = ({
  input,
}) => {
  return db.attempt.create({
    data: input,
  })
}

export const updateAttempt: MutationResolvers['updateAttempt'] = ({
  id,
  input,
}) => {
  return db.attempt.update({
    data: input,
    where: { id },
  })
}

export const deleteAttempt: MutationResolvers['deleteAttempt'] = ({ id }) => {
  return db.attempt.delete({
    where: { id },
  })
}

export const Attempt: AttemptRelationResolvers = {
  user: (_obj, { root }) => {
    return db.attempt.findUnique({ where: { id: root?.id } }).user()
  },
  step: (_obj, { root }) => {
    return db.attempt.findUnique({ where: { id: root?.id } }).step()
  },
  solves: (_obj, { root }) => {
    return db.attempt.findUnique({ where: { id: root?.id } }).solves()
  },
}
