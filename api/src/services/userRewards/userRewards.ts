import type {
  QueryResolvers,
  MutationResolvers,
  UserRewardRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userRewards: QueryResolvers['userRewards'] = () => {
  return db.userReward.findMany()
}

export const userReward: QueryResolvers['userReward'] = ({ id }) => {
  return db.userReward.findUnique({
    where: { id },
  })
}

export const createUserReward: MutationResolvers['createUserReward'] = ({
  input,
}) => {
  return db.userReward.create({
    data: input,
  })
}

export const updateUserReward: MutationResolvers['updateUserReward'] = ({
  id,
  input,
}) => {
  return db.userReward.update({
    data: input,
    where: { id },
  })
}

export const deleteUserReward: MutationResolvers['deleteUserReward'] = ({
  id,
}) => {
  return db.userReward.delete({
    where: { id },
  })
}

export const UserReward: UserRewardRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userReward.findUnique({ where: { id: root?.id } }).user()
  },
  rewardable: (_obj, { root }) => {
    return db.userReward.findUnique({ where: { id: root?.id } }).rewardable()
  },
  nfts: (_obj, { root }) => {
    return db.userReward.findUnique({ where: { id: root?.id } }).nfts()
  },
}