import type {
  QueryResolvers,
  MutationResolvers,
  StepRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const steps: QueryResolvers['steps'] = () => {
  return db.step.findMany()
}

export const step: QueryResolvers['step'] = ({ stepId }) => {
  return db.step.findUnique({
    where: { stepId },
  })
}

export const createStep: MutationResolvers['createStep'] = ({ input }) => {
  return db.step.create({
    data: input,
  })
}

export const updateStep: MutationResolvers['updateStep'] = ({
  stepId,
  input,
}) => {
  return db.step.update({
    data: input,
    where: { stepId },
  })
}

export const deleteStep: MutationResolvers['deleteStep'] = ({ stepId }) => {
  return db.step.delete({
    where: { stepId },
  })
}

export const Step: StepRelationResolvers = {
  puzzle: (_obj, { root }) => {
    return db.step.findUnique({ where: { stepId: root?.stepId } }).puzzle()
  },
}
