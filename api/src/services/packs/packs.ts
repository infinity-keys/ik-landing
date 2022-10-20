import type {
  QueryResolvers,
  MutationResolvers,
  PackRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const packs: QueryResolvers['packs'] = () => {
  return db.pack.findMany()
}

export const pack: QueryResolvers['pack'] = ({ id }) => {
  return db.pack.findUnique({
    where: { id },
  })
}

export const createPack: MutationResolvers['createPack'] = ({ input }) => {
  return db.pack.create({
    data: input,
  })
}

export const updatePack: MutationResolvers['updatePack'] = ({ id, input }) => {
  return db.pack.update({
    data: input,
    where: { id },
  })
}

export const deletePack: MutationResolvers['deletePack'] = ({ id }) => {
  return db.pack.delete({
    where: { id },
  })
}

export const Pack: PackRelationResolvers = {
  puzzles: (_obj, { root }) => {
    return db.pack.findUnique({ where: { id: root?.id } }).puzzles()
  },
}
