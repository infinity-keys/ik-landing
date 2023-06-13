import { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { mint } from 'src/lib/mint'
import { addNftReward } from 'src/lib/nft'
import { checkBalance } from 'src/lib/web3/check-balance'
import { checkClaimed } from 'src/lib/web3/check-claimed'
import { rewardableClaim } from 'src/services/ik/rewardables/rewardables'

export const claim: MutationResolvers['claim'] = async ({
  rewardableId,
  externalAddress,
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

    const { address: account, accessToken } =
      (await db.user.findUnique({
        where: { id: context.currentUser?.id },
      })) || {}

    if (!accessToken || !account) {
      throw new Error('Error obtaining user data required to mint.')
    }

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
      return {
        claimed,
        tokenId,
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

      // Checks both the generated wallet address from the DB and the one
      // connected via wagmi
      const {
        claimed: hasRequiredNfts,
        errors: checkBalanceErrors,
        claimedTokens,
      } = await checkBalance({
        account,
        externalAddress: externalAddress ?? undefined,
        tokenIds: requiredNftIds,
      })

      if (checkBalanceErrors && checkBalanceErrors.length > 0) {
        return { errors: checkBalanceErrors }
      }

      if (!hasRequiredNfts && claimedTokens?.length) {
        const missingNfts = requiredNftIds
          .filter((_, i) => !claimedTokens[i])
          .join(', ')

        return {
          errors: [
            `You are missing NFT ids: ${missingNfts}. Please ensure you have completed the above puzzles and are on the correct chain.`,
          ],
        }
      }
    }

    const { success, explorerUrl, errors } = await mint(
      accessToken,
      account,
      tokenId
    )

    if (errors?.length) {
      return { errors }
    }

    if (success) {
      // @TODO: still return tx information even if this line breaks
      await addNftReward(rewardableId)
    }

    return {
      success,
      explorerUrl,
      tokenId,
    }
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
