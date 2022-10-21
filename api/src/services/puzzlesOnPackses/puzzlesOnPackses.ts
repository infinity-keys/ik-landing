import type {
  QueryResolvers,
  MutationResolvers,
  PuzzlesOnPacksRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const puzzlesOnPackses: QueryResolvers['puzzlesOnPackses'] = () => {
  return db.puzzlesOnPacks.findMany()
}

export const puzzlesOnPacks: QueryResolvers['puzzlesOnPacks'] = ({ id }) => {
  return db.puzzlesOnPacks.findUnique({
    where: { id },
  })
}

export const createPuzzlesOnPacks: MutationResolvers['createPuzzlesOnPacks'] =
  ({ input }) => {
    return db.puzzlesOnPacks.create({
      data: input,
    })
  }

export const updatePuzzlesOnPacks: MutationResolvers['updatePuzzlesOnPacks'] =
  ({ id, input }) => {
    return db.puzzlesOnPacks.update({
      data: input,
      where: { id },
    })
  }

export const deletePuzzlesOnPacks: MutationResolvers['deletePuzzlesOnPacks'] =
  ({ id }) => {
    return db.puzzlesOnPacks.delete({
      where: { id },
    })
  }

export const PuzzlesOnPacks: PuzzlesOnPacksRelationResolvers = {
  puzzle: (_obj, { root }) => {
    return db.puzzlesOnPacks.findUnique({ where: { id: root?.id } }).puzzle()
  },
  pack: (_obj, { root }) => {
    return db.puzzlesOnPacks.findUnique({ where: { id: root?.id } }).pack()
  },
}
