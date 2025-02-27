import { MutationResolvers } from 'types/graphql'

import { addNftReward } from 'src/lib/nft'
import { generateSignature } from 'src/lib/signature/signature'
import { checkBalance } from 'src/lib/web3/check-balance'
import { checkClaimed } from 'src/lib/web3/check-claimed'
import { rewardableClaim } from 'src/services/ik/rewardables/rewardables'

export const claim: MutationResolvers['claim'] = async ({
  rewardableId,
  account,
}) => {
  try {
    const rewardableData = await rewardableClaim({ id: rewardableId })

    // rewardable has not been solved
    if (!rewardableData || rewardableData.userRewards.length === 0) {
      return {
        errors: ['Please solve to claim'],
      }
    }

    // Has this rewardable's NFT been claimed by this user account
    const usersNfts = rewardableData.userRewards[0].nfts?.map(({ id }) => id)
    const claimedByUser = rewardableData.nfts.every(({ id }) =>
      usersNfts.includes(id)
    )

    if (claimedByUser) {
      return {
        errors: ['This NFT has already been claimed on this user account.'],
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

    // @TODO: claim logic breaks when we have more than 1 NFT per rewardable
    const { tokenId } = rewardableData.nfts[0]

    // has this nft already been claimed on this account
    const { claimed, errors: checkClaimedErrors } = await checkClaimed({
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
      await addNftReward(rewardableId)

      return {
        claimed,
        tokenId,
        errors: ['You have already claimed'],
      }
    }

    // if the rewardable has children NFTs that need to have been claimed
    // ensure user has claimed them all before generating signature
    if (isPack) {
      // generate gatedIds if claiming a pack, bundle, etc
      const requiredNftIds = rewardableData.asParent.map(
        ({ childRewardable }) => childRewardable.nfts[0].tokenId
      )

      // Checks contract to ensure user has claimed all required NFTs
      const balances = await checkBalance({
        account,
        tokenIds: requiredNftIds,
      })

      if (!balances.ok) {
        return { errors: [balances.val] }
      }

      const { hasRequiredNfts, claimedTokens } = balances.val

      if (!hasRequiredNfts) {
        // Get token IDs for unclaimed NFTs
        const missingNfts = requiredNftIds
          .filter((_, i) => !claimedTokens[i])
          .join(', ')

        return {
          errors: [
            `You are missing NFT ids: ${missingNfts}. Please ensure you have completed the above puzzles.`,
          ],
        }
      }
    }

    const signature = await generateSignature(account, tokenId)

    if (!signature.ok) {
      return { errors: [signature.val] }
    }

    return { signature: signature.val, claimed, tokenId }
  } catch (e) {
    if (e instanceof Error) {
      return { errors: [e.message] }
    }

    return {
      errors: [e].flatMap((msg) => (typeof msg === 'string' ? msg : [])) ?? [
        'There was an error claiming this NFT.',
      ],
    }
  }
}
