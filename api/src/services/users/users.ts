import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ userId }) => {
  return db.user.findUnique({
    where: { userId },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({
  userId,
  input,
}) => {
  return db.user.update({
    data: input,
    where: { userId },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ userId }) => {
  return db.user.delete({
    where: { userId },
  })
}
