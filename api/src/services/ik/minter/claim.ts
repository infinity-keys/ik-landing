import { QueryResolvers } from 'types/graphql'

import { rewardableClaim } from 'src/services/ik/rewardables/rewardables'

import { checkClaimed } from './check-claimed'
import { verify } from './verify'

export const claim: QueryResolvers['claim'] = async ({
  account,
  rewardableId,
  chainId,
}) => {
  // check cookie to see if puzzleId steps are greater than 0, but what about steps...
  // check db to see if user can claim before hitting block chain

  const rewardableData = await rewardableClaim({ id: rewardableId })

  if (!rewardableData || !rewardableData.completed) {
    return {
      success: true,
      message: 'You have not completed this',
    }
  }

  const tokenId = rewardableData.nfts[0].tokenId

  const {
    claimed,
    chainClaimed,
    success: checkClaimedSuccess,
  } = await checkClaimed({
    account,
    tokenId,
  })

  if (!checkClaimedSuccess) {
    return { success: false, message: 'Error checking blockchain' }
  }

  if (claimed) {
    return {
      success: true,
      claimed,
      chainClaimed,
      message: 'You have already claimed this NFT',
    }
  }

  const gatedIds =
    rewardableData.asParent &&
    rewardableData.asParent.map(
      ({ childRewardable }) => childRewardable.nfts[0].tokenId
    )

  const {
    signature,
    success: verifySuccess,
    message: verifyMessage,
  } = await verify({
    account,
    tokenId,
    chainId,
    gatedIds,
  })

  if (!verifySuccess || !signature) {
    return { success: false, message: verifyMessage }
  }

  return {
    success: true,
    chainClaimed,
    signature,
    tokenId,
  }
}
