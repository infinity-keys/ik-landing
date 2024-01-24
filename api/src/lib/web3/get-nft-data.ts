import { nanoid } from 'nanoid'

import { db } from 'src/lib/db'
import { createContractNft } from 'src/lib/web3/create-contract-nft/create-contract-nft'

// @NOTE: If an NFT with this token ID exists in the DB, it will throw an error
const DEFAULT_TOKEN_ID = 100

const getTokenIdFromDB = async () => {
  const lastTokenRecord = await db.nft.findFirst({
    orderBy: {
      tokenId: 'desc',
    },
  })
  return lastTokenRecord ? lastTokenRecord.tokenId + 1 : DEFAULT_TOKEN_ID
}

// In production we need to create NFTs from our live contract.
// In dev, we're just going to make it up
export const getNftData = async () => {
  if (process.env.NODE_ENV === 'production') {
    return await createContractNft()
  }

  return {
    tokenId: await getTokenIdFromDB(),
    lookupId: nanoid(),
  }
}
