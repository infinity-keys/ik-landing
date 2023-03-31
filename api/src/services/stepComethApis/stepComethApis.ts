import type {
  QueryResolvers,
  MutationResolvers,
  StepComethApiRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepComethApis: QueryResolvers['stepComethApis'] = () => {
  return db.stepComethApi.findMany()
}

export const stepComethApi: QueryResolvers['stepComethApi'] = ({ id }) => {
  return db.stepComethApi.findUnique({
    where: { id },
  })
}

export const createStepComethApi: MutationResolvers['createStepComethApi'] = ({
  input,
}) => {
  return db.stepComethApi.create({
    data: input,
  })
}

export const updateStepComethApi: MutationResolvers['updateStepComethApi'] = ({
  id,
  input,
}) => {
  return db.stepComethApi.update({
    data: input,
    where: { id },
  })
}

export const deleteStepComethApi: MutationResolvers['deleteStepComethApi'] = ({
  id,
}) => {
  return db.stepComethApi.delete({
    where: { id },
  })
}

export const StepComethApi: StepComethApiRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepComethApi.findUnique({ where: { id: root?.id } }).step()
  },
}
