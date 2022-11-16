import type {
  QueryResolvers,
  MutationResolvers,
  RewardableConnectionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const rewardableConnections: QueryResolvers['rewardableConnections'] =
  () => {
    return db.rewardableConnection.findMany()
  }

export const rewardableConnection: QueryResolvers['rewardableConnection'] = ({
  id,
}) => {
  return db.rewardableConnection.findUnique({
    where: { id },
  })
}

export const createRewardableConnection: MutationResolvers['createRewardableConnection'] =
  ({ input }) => {
    return db.rewardableConnection.create({
      data: input,
    })
  }

export const updateRewardableConnection: MutationResolvers['updateRewardableConnection'] =
  ({ id, input }) => {
    return db.rewardableConnection.update({
      data: input,
      where: { id },
    })
  }

export const deleteRewardableConnection: MutationResolvers['deleteRewardableConnection'] =
  ({ id }) => {
    return db.rewardableConnection.delete({
      where: { id },
    })
  }

export const RewardableConnection: RewardableConnectionRelationResolvers = {
  parentRewardable: (_obj, { root }) => {
    return db.rewardableConnection
      .findUnique({ where: { id: root?.id } })
      .parentRewardable()
  },
  childRewardable: (_obj, { root }) => {
    return db.rewardableConnection
      .findUnique({ where: { id: root?.id } })
      .childRewardable()
  },
}
