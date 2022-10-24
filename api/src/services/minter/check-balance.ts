import castArray from 'lodash/castArray'
import { QueryResolvers } from 'types/graphql'

import { contractLookup } from 'src/lib/walletConstants'
import { AVAX_CHAIN_ID } from 'src/lib/walletConstants'

export const checkBalance: QueryResolvers['checkBalance'] = async ({
  account,
  tokenIds,
  chainId,
}) => {
  const tokenIdsArray = castArray(tokenIds)

  const chainIdAsNumber = parseInt(chainId, 10)

  const contract = contractLookup[chainIdAsNumber]
  if (!contract) return { success: false }

  // faster call on avax than eth..
  const contractAVAX = contractLookup[AVAX_CHAIN_ID]
  const numTokens = (await contractAVAX.totalSupplyAll()).length

  // check if token Ids exist
  const validIds = tokenIdsArray.every((t) => parseInt(t, 10) < numTokens)

  if (!validIds || !contract) return { success: false }

  const accountArray = Array(tokenIdsArray.length).fill(account)

  // returns type ethers.BigNumber
  const balances = await contract?.balanceOfBatch(accountArray, tokenIdsArray)

  // check every balance of every tokenId- if 0 for any of them return false
  const claimedTokens = balances?.map((b) => b.toNumber() > 0)
  // checks if all nft are claimed, returns true if eligible to claim pack nft
  const claimed = claimedTokens?.every((b) => b)

  return { success: true, claimed, claimedTokens }
}
