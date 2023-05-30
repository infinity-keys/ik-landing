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
    followedUserId,
  }: {
    profileId: string
    account: string
    followedUserId?: string
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
  async makeRequest({ account, followedUserId }) {
    if (!followedUserId) {
      throw new Error(
        'Lens check "IS_FOLLOWING_USER" requires a "followedUserId"'
      )
    }

    const [{ follows }] = await lensClient.profile.doesFollow({
      followInfos: [
        {
          followerAddress: account,
          profileId: followedUserId,
        },
      ],
    })

    return { success: follows }
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
  followedUserId,
}: {
  profileId: string
  account: string
  checkType: LensCheckType
  followedUserId?: string
}): Promise<{
  success: boolean
  errors?: string[]
}> => {
  const lensCheck = checkTypeLookup[checkType]

  try {
    const success = await lensCheck.makeRequest({
      profileId,
      account,
      followedUserId,
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
