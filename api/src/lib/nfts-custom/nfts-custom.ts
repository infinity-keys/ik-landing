import { db } from 'src/lib/db'

export const nftByContractAndTokenId = (
  tokenId: number,
  contractName: string
) => {
  return db.nft.findUnique({
    where: {
      contractName_tokenId: {
        contractName,
        tokenId,
      },
    },
  })
}
