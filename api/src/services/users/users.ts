import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  // they put auth check here in the docs, but it works
  // without it since the resolver requires auth
  requireAuth()
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ authId }) => {
  requireAuth()
  return db.user.findUnique({
    where: { authId },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  organizations: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).organizations()
  },
  submissions: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).submissions()
  },
  attempts: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).attempts()
  },
}
