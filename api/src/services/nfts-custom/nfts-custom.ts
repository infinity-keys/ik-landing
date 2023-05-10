import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const nftByContractAndTokenId: QueryResolvers['nftByContractAndTokenId'] =
  (
    { tokenId }: { tokenId: number },
    { contractName }: { contractName: string }
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
