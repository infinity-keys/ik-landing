import { QueryResolvers } from 'types/graphql'

import { getSignature } from 'src/lib/verifySignature'
import { rewardableClaim } from 'src/services/ik/rewardables/rewardables'

import { checkBalance } from './check-balance'
import { checkClaimed } from './check-claimed'

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
      errors: ['You have already claimed this NFT'],
    }
  }

  // if the rewardable has children NFTs that need to have been claimed
  // ensure user has claimed them all before generating signature
  if (isPack) {
    // generate gatedIds if claiming a pack, bundle, etc
    const requiredNftIds = rewardableData.asParent.map(
      ({ childRewardable }) => childRewardable.nfts[0].tokenId
    )

    const { claimed: hasRequiredNfts, errors: checkBalanceErrors } =
      await checkBalance({
        account,
        chainId,
        tokenIds: requiredNftIds,
      })

    if (checkBalanceErrors && checkBalanceErrors.length > 0) {
      return { errors: checkBalanceErrors }
    }

    if (!hasRequiredNfts) {
      return {
        errors: [
          'You do not have the required NFTs on this chain. Please ensure you have completed the above puzzles and are on the correct chain.',
        ],
      }
    }
  }

  const signature = await getSignature(chainId, account, tokenId)

  return {
    signature,
    tokenId,
  }
}
