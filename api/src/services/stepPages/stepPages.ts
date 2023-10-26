import type {
  QueryResolvers,
  MutationResolvers,
  StepPageRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepPages: QueryResolvers['stepPages'] = () => {
  return db.stepPage.findMany()
}

export const stepPage: QueryResolvers['stepPage'] = ({ id }) => {
  return db.stepPage.findUnique({
    where: { id },
  })
}

export const createStepPage: MutationResolvers['createStepPage'] = ({
  input,
}) => {
  return db.stepPage.create({
    data: input,
  })
}

export const updateStepPage: MutationResolvers['updateStepPage'] = ({
  id,
  input,
}) => {
  return db.stepPage.update({
    data: input,
    where: { id },
  })
}

export const deleteStepPage: MutationResolvers['deleteStepPage'] = ({ id }) => {
  return db.stepPage.delete({
    where: { id },
  })
}

export const StepPage: StepPageRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepPage.findUnique({ where: { id: root?.id } }).step()
  },
}
