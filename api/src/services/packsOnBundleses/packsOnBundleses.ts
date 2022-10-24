import type {
  QueryResolvers,
  MutationResolvers,
  PacksOnBundlesRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const packsOnBundleses: QueryResolvers['packsOnBundleses'] = () => {
  return db.packsOnBundles.findMany()
}

export const packsOnBundles: QueryResolvers['packsOnBundles'] = ({ id }) => {
  return db.packsOnBundles.findUnique({
    where: { id },
  })
}

export const createPacksOnBundles: MutationResolvers['createPacksOnBundles'] =
  ({ input }) => {
    return db.packsOnBundles.create({
      data: input,
    })
  }

export const updatePacksOnBundles: MutationResolvers['updatePacksOnBundles'] =
  ({ id, input }) => {
    return db.packsOnBundles.update({
      data: input,
      where: { id },
    })
  }

export const deletePacksOnBundles: MutationResolvers['deletePacksOnBundles'] =
  ({ id }) => {
    return db.packsOnBundles.delete({
      where: { id },
    })
  }

export const PacksOnBundles: PacksOnBundlesRelationResolvers = {
  pack: (_obj, { root }) => {
    return db.packsOnBundles.findUnique({ where: { id: root?.id } }).pack()
  },
  bundle: (_obj, { root }) => {
    return db.packsOnBundles.findUnique({ where: { id: root?.id } }).bundle()
  },
}
