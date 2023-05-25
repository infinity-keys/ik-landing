import type {
  QueryResolvers,
  MutationResolvers,
  StepOriumApiRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepOriumApis: QueryResolvers['stepOriumApis'] = () => {
  return db.stepOriumApi.findMany()
}

export const stepOriumApi: QueryResolvers['stepOriumApi'] = ({ id }) => {
  return db.stepOriumApi.findUnique({
    where: { id },
  })
}

export const createStepOriumApi: MutationResolvers['createStepOriumApi'] = ({
  input,
}) => {
  return db.stepOriumApi.create({
    data: input,
  })
}

export const updateStepOriumApi: MutationResolvers['updateStepOriumApi'] = ({
  id,
  input,
}) => {
  return db.stepOriumApi.update({
    data: input,
    where: { id },
  })
}

export const deleteStepOriumApi: MutationResolvers['deleteStepOriumApi'] = ({
  id,
}) => {
  return db.stepOriumApi.delete({
    where: { id },
  })
}

export const StepOriumApi: StepOriumApiRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepOriumApi.findUnique({ where: { id: root?.id } }).step()
  },
}
