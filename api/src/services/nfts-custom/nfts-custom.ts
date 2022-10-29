import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const nftByContractAndTokenId: QueryResolvers['nftByContractAndTokenId'] =
  ({ tokenId, contractName }) => {
    return db.nft.findUnique({
      where: {
        contractName_tokenId: {
          contractName,
          tokenId,
        },
      },
    })
  }
