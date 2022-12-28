import { chainIds, AVAX_CHAIN_ID } from '@infinity-keys/constants'
import { QueryResolvers } from 'types/graphql'

import { contractLookup } from 'src/lib/lookups'

export const checkClaimed: QueryResolvers['checkClaimed'] = async ({
  account,
  tokenId,
}) => {
  // @TODO: is this still needed in Redwood
  if (typeof tokenId !== 'string' || typeof account !== 'string')
    return { success: false }

  // faster call on avax than eth.. theoretically should be the same
  // ensure token were checking exists
  // would be dope to move this to database
  const totalSupply = await contractLookup[AVAX_CHAIN_ID].totalSupplyAll()
  if (parseInt(tokenId, 10) >= totalSupply.length) return { success: false }

  const contractPromises = chainIds.map((chainId) =>
    contractLookup[chainId].checkIfClaimed(tokenId, account)
  )

  const contractClaims = await Promise.all(contractPromises)
  const claimed = contractClaims.some(Boolean)

  const chainClaimed = claimed
    ? chainIds[contractClaims.flatMap((bool, index) => (bool ? index : []))[0]]
    : 0

  return { success: true, claimed, chainClaimed }
}
