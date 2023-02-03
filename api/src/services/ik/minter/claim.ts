import { QueryResolvers } from 'types/graphql'

import { rewardableClaim } from 'src/services/ik/rewardables/rewardables'

import { checkClaimed } from './check-claimed'
import { verify } from './verify'

export const claim: QueryResolvers['claim'] = async ({
  account,
  rewardableId,
  chainId,
}) => {
  // @TODO: can we check cookie to see if puzzleId steps are greater than 0, (but what about packs...)

  const rewardableData = await rewardableClaim({ id: rewardableId })

  // rewardable has not been solved
  if (!rewardableData || rewardableData.userRewards.length === 0) {
    return {
      success: true,
      message: 'Please solve to claim',
    }
  }

  const isPack = rewardableData.type === 'PACK'

  if (isPack) {
    // all child rewardables need to be solved first
    const solvedAllChildren = rewardableData.asParent.every(
      ({ childRewardable }) => childRewardable.userRewards.length > 0
    )

    if (!solvedAllChildren) {
      return {
        success: true,
        message: 'Must solve all associated puzzles before claiming',
      }
    }
  }

  const { tokenId } = rewardableData.nfts[0]

  // has this nft already been claimed on this account
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

  // generate gatedIds if claiming a pack
  const gatedIds =
    isPack &&
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
