import type {
  QueryResolvers,
  MutationResolvers,
  StepSimpleTextRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepSimpleTexts: QueryResolvers['stepSimpleTexts'] = () => {
  return db.stepSimpleText.findMany()
}

export const stepSimpleText: QueryResolvers['stepSimpleText'] = ({ id }) => {
  return db.stepSimpleText.findUnique({
    where: { id },
  })
}

export const createStepSimpleText: MutationResolvers['createStepSimpleText'] =
  ({ input }) => {
    return db.stepSimpleText.create({
      data: input,
    })
  }

export const updateStepSimpleText: MutationResolvers['updateStepSimpleText'] =
  ({ id, input }) => {
    return db.stepSimpleText.update({
      data: input,
      where: { id },
    })
  }

export const deleteStepSimpleText: MutationResolvers['deleteStepSimpleText'] =
  ({ id }) => {
    return db.stepSimpleText.delete({
      where: { id },
    })
  }

export const StepSimpleText: StepSimpleTextRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepSimpleText.findUnique({ where: { id: root?.id } }).step()
  },
  // Override the actual field with logic here
  solutionCharCount: (_obj, { root }) => {
    return root.solution.length
  },
}
