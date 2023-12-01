import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { AuthenticationError, context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = () => {
  if (!context.currentUser?.authId) {
    throw new AuthenticationError('No current user')
  }
  return db.user.findUnique({
    where: { authId: context.currentUser.authId },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ input }) => {
  if (!context.currentUser?.authId) {
    throw new AuthenticationError('No current user')
  }
  return db.user.update({
    data: input,
    where: { authId: context.currentUser.authId },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = () => {
  if (!context.currentUser?.authId) {
    throw new AuthenticationError('No current user')
  }

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

    return db.user.findUnique({ where: { id: root?.id } }).userRewards()
  },
  discordConnection: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).discordConnection()
  },
  lensKeypConnection: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).lensKeypConnection()
  },
  stepsSolvedCount: () => {
    if (!context.currentUser) {
      throw new AuthenticationError('No current user')
    }
    return db.solve.count({
      where: { userId: context.currentUser.id },
    })
  },
  puzzlesSolvedCount: () => {
    if (!context.currentUser) {
      throw new AuthenticationError('No current user')
    }
    return db.userReward.count({
      where: {
        userId: context.currentUser.id,
        rewardable: { type: 'PUZZLE' },
      },
    })
  },
  packsSolvedCount: () => {
    if (!context.currentUser) {
      throw new AuthenticationError('No current user')
    }
    return db.userReward.count({
      where: {
        userId: context.currentUser.id,
        rewardable: { type: 'PACK' },
      },
    })
  },
  nftsSolvedCount: () => {
    if (!context.currentUser) {
      throw new AuthenticationError('No current user')
    }
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
