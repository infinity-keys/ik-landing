import type {
  QueryResolvers,
  MutationResolvers,
  StepsOnPuzzlesRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepsOnPuzzleses: QueryResolvers['stepsOnPuzzleses'] = () => {
  return db.stepsOnPuzzles.findMany()
}

export const stepsOnPuzzles: QueryResolvers['stepsOnPuzzles'] = ({ id }) => {
  return db.stepsOnPuzzles.findUnique({
    where: { id },
  })
}

export const createStepsOnPuzzles: MutationResolvers['createStepsOnPuzzles'] =
  ({ input }) => {
    return db.stepsOnPuzzles.create({
      data: input,
    })
  }

export const updateStepsOnPuzzles: MutationResolvers['updateStepsOnPuzzles'] =
  ({ id, input }) => {
    return db.stepsOnPuzzles.update({
      data: input,
      where: { id },
    })
  }

export const deleteStepsOnPuzzles: MutationResolvers['deleteStepsOnPuzzles'] =
  ({ id }) => {
    return db.stepsOnPuzzles.delete({
      where: { id },
    })
  }

export const StepsOnPuzzles: StepsOnPuzzlesRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepsOnPuzzles.findUnique({ where: { id: root?.id } }).step()
  },
  puzzle: (_obj, { root }) => {
    return db.stepsOnPuzzles.findUnique({ where: { id: root?.id } }).puzzle()
  },
}
