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
      errors: ['Please solve to claim'],
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
        errors: ['Must solve all associated puzzles before claiming'],
      }
    }
  }

  const { tokenId } = rewardableData.nfts[0]

  // has this nft already been claimed on this account
  const {
    claimed,
    chainClaimed,
    errors: checkClaimedErrors,
  } = await checkClaimed({
    account,
    tokenId,
  })

  // if an error occurs in checkClaimed, it will not return a "claimed" key
  if (
    typeof claimed === 'undefined' &&
    checkClaimedErrors &&
    checkClaimedErrors.length > 0
  ) {
    return { errors: checkClaimedErrors }
  }

  // the user has claimed this NFT before and is not eligible to claim again
  if (claimed) {
    return {
      claimed,
      chainClaimed,
      message: 'You have already claimed this NFT',
    }
  }

  // generate gatedIds if claiming a pack, bundle, etc
  const gatedIds =
    isPack &&
    rewardableData.asParent.map(
      ({ childRewardable }) => childRewardable.nfts[0].tokenId
    )

  // check user owns other required NFTs (if any) then generate signature
  const { signature, errors: verifyErrors } = await verify({
    account,
    tokenId,
    chainId,
    gatedIds,
  })

  if ((verifyErrors && verifyErrors.length > 0) || !signature) {
    return { errors: verifyErrors }
  }

  return {
    chainClaimed,
    signature,
    tokenId,
  }
}
