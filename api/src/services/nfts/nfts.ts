import type {
  QueryResolvers,
  MutationResolvers,
  NftRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const nfts: QueryResolvers['nfts'] = () => {
  return db.nft.findMany()
}

export const nft: QueryResolvers['nft'] = ({ id }) => {
  return db.nft.findUnique({
    where: { id },
  })
}

export const createNft: MutationResolvers['createNft'] = ({ input }) => {
  return db.nft.create({
    data: input,
  })
}

export const updateNft: MutationResolvers['updateNft'] = ({ id, input }) => {
  return db.nft.update({
    data: input,
    where: { id },
  })
}

export const deleteNft: MutationResolvers['deleteNft'] = ({ id }) => {
  return db.nft.delete({
    where: { id },
  })
}

export const Nft: NftRelationResolvers = {
  rewardables: (_obj, { root }) => {
    return db.nft.findUnique({ where: { id: root?.id } }).rewardables()
  },
  userRewards: (_obj, { root }) => {
    return db.nft
      .findUnique({ where: { id: root?.id } })
      .userRewards({ where: { userId: context.currentUser.id } })
  },
}
