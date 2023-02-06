import castArray from 'lodash/castArray'
import { QueryResolvers } from 'types/graphql'

import { getSignature } from 'src/lib/verifySignature'

import { checkBalance } from './check-balance'

export const verify: QueryResolvers['verify'] = async ({
  account,
  tokenId,
  chainId,
  gatedIds,
}) => {
  let claimedTokens: boolean[] | undefined

  // If not gated- its a single puzzle
  // If gated- its a pack, check the balance of the gatedIds

  // @TODO: check puzzle or pack by NFT tokenId

  if (gatedIds) {
    try {
      const tokenIds = castArray(gatedIds)

      const { claimed: ownedStatus, claimedTokens: claimedTokensBalance } =
        await checkBalance({
          account,
          tokenIds,
          chainId,
        })

      // @TODO: I think claimedTokens was a progress hack. we might not need this
      claimedTokens = claimedTokensBalance

      if (!ownedStatus) {
        return {
          errors: [
            'You do not have the required NFTS on this chain. Please ensure you have completed the above puzzles and are on the correct chain.',
          ],
          claimedTokens,
        }
      }
    } catch (e) {
      return {
        errors: ['Something went wrong verifying your claim'],
      }
    }
  }
  const signature = await getSignature(chainId, account, tokenId.toString())

  return { signature, claimedTokens }
}
