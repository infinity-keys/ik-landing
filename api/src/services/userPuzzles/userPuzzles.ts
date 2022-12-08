import type {
  QueryResolvers,
  MutationResolvers,
  UserPuzzleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userPuzzles: QueryResolvers['userPuzzles'] = () => {
  return db.userPuzzle.findMany()
}

export const userPuzzle: QueryResolvers['userPuzzle'] = ({ id }) => {
  return db.userPuzzle.findUnique({
    where: { id },
  })
}

export const createUserPuzzle: MutationResolvers['createUserPuzzle'] = ({
  input,
}) => {
  return db.userPuzzle.create({
    data: input,
  })
}

export const updateUserPuzzle: MutationResolvers['updateUserPuzzle'] = ({
  id,
  input,
}) => {
  return db.userPuzzle.update({
    data: input,
    where: { id },
  })
}

export const deleteUserPuzzle: MutationResolvers['deleteUserPuzzle'] = ({
  id,
}) => {
  return db.userPuzzle.delete({
    where: { id },
  })
}

export const UserPuzzle: UserPuzzleRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userPuzzle.findUnique({ where: { id: root?.id } }).user()
  },
}
