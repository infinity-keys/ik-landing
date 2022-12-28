import castArray from 'lodash/castArray'
import { QueryResolvers } from 'types/graphql'

import { getSignature } from 'src/lib/verifySignature'

import { checkBalance } from './check-balance'

export const verify: QueryResolvers['verify'] = async ({
  account,
  tokenId,
  chainId,
}) => {
  let claimedTokens: boolean[] | undefined
  // @BLOOM: I think if statement should move to middleware- if its a pack, do
  // the gatedIds check before sending them here

  // If not gated- its a single puzzle
  // If gated- its a pack, check the balance of the gatedIds

  // @TODO: check puzzle or pack by NFT tokenId
  // @TODO: get any gated ids from the DB and replace gatedIds const
  const gatedIds = [0, 1]
  // @TODO: handle no gatedIds use case

  if (gatedIds) {
    try {
      const tokenIds = castArray(gatedIds)

      const { claimed: ownedStatus, claimedTokens: claimedTokensBalance } =
        await checkBalance({
          account,
          tokenIds,
          chainId,
        })

      claimedTokens = claimedTokensBalance

      if (!ownedStatus) {
        return {
          success: true,
          message:
            'You do not have the required NFTS on this chain. Please ensure you have completed the above puzzles and are on the correct chain.',
          claimedTokens,
        }
      }
    } catch (e) {
      return { success: false }
    }
  }
  const signature = await getSignature(chainId, account, tokenId.toString())
  return { success: true, signature, claimedTokens }
}
