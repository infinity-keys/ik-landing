import { db } from 'src/lib/db'

export const nftByContractAndTokenId = async (
  tokenId: number,
  contractName: string
) => {
  const nft = await db.nft.findUnique({
    where: {
      contractName_tokenId: {
        contractName,
        tokenId,
      },
    },
  })

  return nft
}

export const nftByStringId = async (lookupId: string) => {
  const nft = await db.nft.findUnique({
    where: {
      lookupId,
    },
  })

  return nft
}
