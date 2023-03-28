import type {
  QueryResolvers,
  MutationResolvers,
  StepFunctionCallRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepFunctionCalls: QueryResolvers['stepFunctionCalls'] = () => {
  return db.stepFunctionCall.findMany()
}

export const stepFunctionCall: QueryResolvers['stepFunctionCall'] = ({
  id,
}) => {
  return db.stepFunctionCall.findUnique({
    where: { id },
  })
}

export const createStepFunctionCall: MutationResolvers['createStepFunctionCall'] =
  ({ input }) => {
    return db.stepFunctionCall.create({
      data: input,
    })
  }

export const updateStepFunctionCall: MutationResolvers['updateStepFunctionCall'] =
  ({ id, input }) => {
    return db.stepFunctionCall.update({
      data: input,
      where: { id },
    })
  }

export const deleteStepFunctionCall: MutationResolvers['deleteStepFunctionCall'] =
  ({ id }) => {
    return db.stepFunctionCall.delete({
      where: { id },
    })
  }

export const StepFunctionCall: StepFunctionCallRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepFunctionCall.findUnique({ where: { id: root?.id } }).step()
  },
}
