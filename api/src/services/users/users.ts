import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = () => {
  return db.user.findUnique({
    where: { authId: context.currentUser.authId },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ input }) => {
  return db.user.update({
    data: input,
    where: { authId: context.currentUser.authId },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = () => {
  return db.user.delete({
    where: { authId: context.currentUser.authId },
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
  solved: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).solved()
  },
  userRewards: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).userRewards()
  },
}
