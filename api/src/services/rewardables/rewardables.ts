import type {
  QueryResolvers,
  MutationResolvers,
  RewardableRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const rewardables: QueryResolvers['rewardables'] = () => {
  return db.rewardable.findMany()
}

export const rewardable: QueryResolvers['rewardable'] = ({ id }) => {
  return db.rewardable.findUnique({
    where: { id },
  })
}

export const createRewardable: MutationResolvers['createRewardable'] = ({
  input,
}) => {
  return db.rewardable.create({
    data: input,
  })
}

export const updateRewardable: MutationResolvers['updateRewardable'] = ({
  id,
  input,
}) => {
  return db.rewardable.update({
    data: input,
    where: { id },
  })
}

export const deleteRewardable: MutationResolvers['deleteRewardable'] = ({
  id,
}) => {
  return db.rewardable.delete({
    where: { id },
  })
}

export const Rewardable: RewardableRelationResolvers = {
  organization: (_obj, { root }) => {
    return db.rewardable.findUnique({ where: { id: root?.id } }).organization()
  },
  nfts: (_obj, { root }) => {
    return db.rewardable.findUnique({ where: { id: root?.id } }).nfts()
  },
  puzzle: (_obj, { root }) => {
    return db.rewardable.findUnique({ where: { id: root?.id } }).puzzle()
  },
  pack: (_obj, { root }) => {
    return db.rewardable.findUnique({ where: { id: root?.id } }).pack()
  },
  bundle: (_obj, { root }) => {
    return db.rewardable.findUnique({ where: { id: root?.id } }).bundle()
  },
  userRewards: (_obj, { root }) => {
    return db.rewardable
      .findUnique({ where: { id: root?.id } })
      .userRewards({ where: { userId: context.currentUser.id } })
  },
  asParent: (_obj, { root }) => {
    return db.rewardable.findUnique({ where: { id: root?.id } }).asParent()
  },
  asChild: (_obj, { root }) => {
    return db.rewardable.findUnique({ where: { id: root?.id } }).asChild()
  },
}
