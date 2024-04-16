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
  userCanEdit: async (_obj, { root }) => {
    if (!context.currentUser) return false

    const canEdit = await db.rewardable.findUnique({
      where: {
        id: root?.id,
        organization: {
          users: {
            some: {
              userId: context.currentUser.id,
            },
          },
        },
      },
      select: {
        id: true,
      },
    })
    return !!canEdit?.id
  },
  userRewards: (_obj, { root }) => {
    if (!context.currentUser) return []

    return db.rewardable
      .findUnique({ where: { id: root?.id } })
      .userRewards({ where: { userId: context.currentUser.id } })
  },
  asParent: (_obj, { root }) => {
    return db.rewardable.findUnique({ where: { id: root?.id } }).asParent({
      orderBy: [
        { childSortWeight: 'asc' },
        { childRewardable: { name: 'asc' } },
      ],
    })
  },
  asChild: (_obj, { root }) => {
    return db.rewardable.findUnique({ where: { id: root?.id } }).asChild()
  },
  asChildPublicParentRewardables: (_obj, { root }) => {
    return db.rewardable
      .findUnique({ where: { id: root?.id } })
      .asChild({ where: { parentRewardable: { listPublicly: true } } })
  },
}
