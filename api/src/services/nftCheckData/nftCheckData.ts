import type {
  QueryResolvers,
  MutationResolvers,
  NftCheckDatumRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const nftCheckData: QueryResolvers['nftCheckData'] = () => {
  return db.nftCheckDatum.findMany()
}

export const nftCheckDatum: QueryResolvers['nftCheckDatum'] = ({ id }) => {
  return db.nftCheckDatum.findUnique({
    where: { id },
  })
}

export const createNftCheckDatum: MutationResolvers['createNftCheckDatum'] = ({
  input,
}) => {
  return db.nftCheckDatum.create({
    data: input,
  })
}

export const updateNftCheckDatum: MutationResolvers['updateNftCheckDatum'] = ({
  id,
  input,
}) => {
  return db.nftCheckDatum.update({
    data: input,
    where: { id },
  })
}

export const deleteNftCheckDatum: MutationResolvers['deleteNftCheckDatum'] = ({
  id,
}) => {
  return db.nftCheckDatum.delete({
    where: { id },
  })
}

export const NftCheckDatum: NftCheckDatumRelationResolvers = {
  StepNftCheck: (_obj, { root }) => {
    return db.nftCheckDatum
      .findUnique({ where: { id: root?.id } })
      .StepNftCheck()
  },
}
