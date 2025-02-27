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

// Displays the puzzles a user can edit or delete on the user's profile page
export const userRewardables: QueryResolvers['userRewardables'] = async ({
  userId,
}) => {
  // Logic to fetch user's Rewardables
  const userOrganizations = await db.organizationUser.findMany({
    where: { userId },
    select: { orgId: true },
  })

  const orgIds = userOrganizations.map((orgUser) => orgUser.orgId)

  const rewardables = await db.rewardable.findMany({
    where: {
      orgId: {
        in: orgIds,
      },
    },
    include: {
      nfts: true,
    },
  })

  return rewardables
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
  primaryOrgRewardableCount: async () => {
    if (!context.currentUser) {
      throw new AuthenticationError('No current user')
    }

    const org = await db.organizationUser.findFirst({
      where: { userId: context.currentUser.id },
      orderBy: { createdAt: 'asc' },
      select: { orgId: true },
    })

    if (!org?.orgId) {
      return null
    }

    return db.rewardable.count({
      where: {
        orgId: org.orgId,
      },
    })
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
