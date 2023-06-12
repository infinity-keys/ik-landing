import { OPTIMISM_CHAIN_ID } from '@infinity-keys/constants'

import { contractLookup } from 'src/lib/lookups'

export const checkClaimed = async ({
  account,
  tokenId,
}: {
  account: string
  tokenId: number
}): Promise<{
  claimed?: boolean
  errors?: string[]
}> => {
  try {
    const optContract = contractLookup[OPTIMISM_CHAIN_ID]
    const claimed = await optContract.checkIfClaimed(tokenId, account)

    return { claimed }
  } catch {
    return { errors: ['Error checking claimed NFT'] }
  }
}
