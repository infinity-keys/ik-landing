import type {
  QueryResolvers,
  MutationResolvers,
  PuzzleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const puzzles: QueryResolvers['puzzles'] = () => {
  return db.puzzle.findMany()
}

export const puzzle: QueryResolvers['puzzle'] = ({ id }) => {
  return db.puzzle.findUnique({
    where: { id },
  })
}

export const createPuzzle: MutationResolvers['createPuzzle'] = ({ input }) => {
  return db.puzzle.create({
    data: input,
  })
}

export const updatePuzzle: MutationResolvers['updatePuzzle'] = ({
  id,
  input,
}) => {
  return db.puzzle.update({
    data: input,
    where: { id },
  })
}

export const deletePuzzle: MutationResolvers['deletePuzzle'] = ({ id }) => {
  return db.puzzle.delete({
    where: { id },
  })
}

export const Puzzle: PuzzleRelationResolvers = {
  steps: (_obj, { root }) => {
    return db.puzzle.findUnique({ where: { id: root?.id } }).steps()
  },
  packs: (_obj, { root }) => {
    return db.puzzle.findUnique({ where: { id: root?.id } }).packs()
  },
  submissions: (_obj, { root }) => {
    return db.puzzle.findUnique({ where: { id: root?.id } }).submissions()
  },
  nft: (_obj, { root }) => {
    return db.puzzle.findUnique({ where: { id: root?.id } }).nft()
  },
}
