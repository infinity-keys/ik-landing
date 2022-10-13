import type {
  QueryResolvers,
  MutationResolvers,
  NftRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const nfts: QueryResolvers['nfts'] = () => {
  return db.nft.findMany()
}

export const nft: QueryResolvers['nft'] = ({ nftId }) => {
  return db.nft.findUnique({
    where: { nftId },
  })
}

export const createNft: MutationResolvers['createNft'] = ({ input }) => {
  return db.nft.create({
    data: input,
  })
}

export const updateNft: MutationResolvers['updateNft'] = ({ nftId, input }) => {
  return db.nft.update({
    data: input,
    where: { nftId },
  })
}

export const deleteNft: MutationResolvers['deleteNft'] = ({ nftId }) => {
  return db.nft.delete({
    where: { nftId },
  })
}

export const Nft: NftRelationResolvers = {
  puzzle: (_obj, { root }) => {
    return db.nft.findUnique({ where: { nftId: root?.nftId } }).puzzle()
  },
}
