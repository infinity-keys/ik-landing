import { LensClient, production } from '@lens-protocol/client'
import { LensCheckType } from 'types/graphql'

import { logger } from 'src/lib/logger'

const lensClient = new LensClient({
  environment: production,
})

type LensObjectType = {
  makeRequest: ({
    profileId,
    account,
    followedUserIds,
    requireAllFollowedUserIds,
  }: {
    profileId: string
    account: string
    followedUserIds?: string[]
    requireAllFollowedUserIds?: boolean
  }) => Promise<{ success: boolean }>
}

const HAS_COMPLETED_PROFILE: LensObjectType = {
  async makeRequest({ profileId }) {
    const { name, bio, picture } =
      (await lensClient.profile.fetch({ profileId })) || {}

    return { success: !!name && !!bio && !!picture?.__typename }
  },
}

const HAS_GENESIS_POST: LensObjectType = {
  async makeRequest({ profileId }) {
    const { stats } = (await lensClient.profile.fetch({ profileId })) || {}
    if (!stats?.totalPosts) return { success: false }

    return { success: stats?.totalPosts > 0 }
  },
}

const IS_FOLLOWING_USER: LensObjectType = {
  async makeRequest({ account, followedUserIds, requireAllFollowedUserIds }) {
    if (!followedUserIds?.length) {
      throw new Error(
        'Lens check "IS_FOLLOWING_USER" requires at least one "followedUserId"'
      )
    }

    const followData = await lensClient.profile.doesFollow({
      followInfos: followedUserIds.map((profileId) => ({
        followerAddress: account,
        profileId,
      })),
    })

    return {
      success: requireAllFollowedUserIds
        ? followData.every(({ follows }) => follows)
        : followData.some(({ follows }) => follows),
    }
  },
}

const checkTypeLookup: {
  [key in LensCheckType]: LensObjectType
} = {
  HAS_COMPLETED_PROFILE,
  HAS_GENESIS_POST,
  IS_FOLLOWING_USER,
}

export const checkLensApi = async ({
  profileId,
  account,
  checkType,
  followedUserIds,
  requireAllFollowedUserIds,
}: {
  profileId: string
  account: string
  checkType: LensCheckType
  followedUserIds?: string[]
  requireAllFollowedUserIds?: boolean
}): Promise<{
  success: boolean
  errors?: string[]
}> => {
  const lensCheck = checkTypeLookup[checkType]

  try {
    const success = await lensCheck.makeRequest({
      profileId,
      account,
      followedUserIds,
      requireAllFollowedUserIds,
    })

    return success
  } catch (e) {
    logger.error(`Failed Lens api check for ${account}`, e)

    if (e instanceof Error) {
      return { errors: [e.message], success: false }
    }
    return { errors: ['Error checking Lens.'], success: false }
  }
}
