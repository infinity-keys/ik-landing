import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { context } from '@redwoodjs/graphql-server'

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
  solves: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).solves()
  },
  userRewards: (_obj, { root }) => {
    if (!context.currentUser) return []

    // @TODO: can I skip the `user` query or does that make it faster
    return db.user.findUnique({ where: { id: root?.id } }).userRewards()
  },
  oauth: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).oauth()
  },
  oauthConnection: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).oauthConnection()
  },
  discordConnection: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).discordConnection()
  },
  lensKeypConnection: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).lensKeypConnection()
  },
  stepsSolvedCount: () => {
    return db.solve.count({
      where: { userId: context.currentUser.id },
    })
  },
  puzzlesSolvedCount: () => {
    return db.userReward.count({
      where: {
        userId: context.currentUser.id,
        rewardable: { type: 'PUZZLE' },
      },
    })
  },
  packsSolvedCount: () => {
    return db.userReward.count({
      where: {
        userId: context.currentUser.id,
        rewardable: { type: 'PACK' },
      },
    })
  },
  nftsSolvedCount: () => {
    return db.userReward.count({
      where: {
        userId: context.currentUser.id,
        nfts: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
    })
  },
}
