import type {
  QueryResolvers,
  MutationResolvers,
  BundleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const bundles: QueryResolvers['bundles'] = () => {
  return db.bundle.findMany()
}

export const bundle: QueryResolvers['bundle'] = ({ id }) => {
  return db.bundle.findUnique({
    where: { id },
  })
}

export const createBundle: MutationResolvers['createBundle'] = ({ input }) => {
  return db.bundle.create({
    data: input,
  })
}

export const updateBundle: MutationResolvers['updateBundle'] = ({
  id,
  input,
}) => {
  return db.bundle.update({
    data: input,
    where: { id },
  })
}

export const deleteBundle: MutationResolvers['deleteBundle'] = ({ id }) => {
  return db.bundle.delete({
    where: { id },
  })
}

export const Bundle: BundleRelationResolvers = {
  nfts: (_obj, { root }) => {
    return db.bundle.findUnique({ where: { id: root?.id } }).nfts()
  },
  packs: (_obj, { root }) => {
    return db.bundle.findUnique({ where: { id: root?.id } }).packs()
  },
}
