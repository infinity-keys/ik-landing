import type {
  QueryResolvers,
  MutationResolvers,
  PuzzleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const puzzles: QueryResolvers['puzzles'] = () => {
  return db.puzzle.findMany()
}

export const puzzle: QueryResolvers['puzzle'] = ({ puzzleId }) => {
  return db.puzzle.findUnique({
    where: { puzzleId },
  })
}

export const createPuzzle: MutationResolvers['createPuzzle'] = ({ input }) => {
  return db.puzzle.create({
    data: input,
  })
}

export const updatePuzzle: MutationResolvers['updatePuzzle'] = ({
  puzzleId,
  input,
}) => {
  return db.puzzle.update({
    data: input,
    where: { puzzleId },
  })
}

export const deletePuzzle: MutationResolvers['deletePuzzle'] = ({
  puzzleId,
}) => {
  return db.puzzle.delete({
    where: { puzzleId },
  })
}

export const Puzzle: PuzzleRelationResolvers = {
  steps: (_obj, { root }) => {
    return db.puzzle.findUnique({ where: { puzzleId: root?.puzzleId } }).steps()
  },
  packs: (_obj, { root }) => {
    return db.puzzle.findUnique({ where: { puzzleId: root?.puzzleId } }).packs()
  },
  submissions: (_obj, { root }) => {
    return db.puzzle
      .findUnique({ where: { puzzleId: root?.puzzleId } })
      .submissions()
  },
  nft: (_obj, { root }) => {
    return db.puzzle.findUnique({ where: { puzzleId: root?.puzzleId } }).nft()
  },
}
