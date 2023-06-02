import type {
  QueryResolvers,
  MutationResolvers,
  StepLensApiRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepLensApis: QueryResolvers['stepLensApis'] = () => {
  return db.stepLensApi.findMany()
}

export const stepLensApi: QueryResolvers['stepLensApi'] = ({ id }) => {
  return db.stepLensApi.findUnique({
    where: { id },
  })
}

export const createStepLensApi: MutationResolvers['createStepLensApi'] = ({
  input,
}) => {
  return db.stepLensApi.create({
    data: input,
  })
}

export const updateStepLensApi: MutationResolvers['updateStepLensApi'] = ({
  id,
  input,
}) => {
  return db.stepLensApi.update({
    data: input,
    where: { id },
  })
}

export const deleteStepLensApi: MutationResolvers['deleteStepLensApi'] = ({
  id,
}) => {
  return db.stepLensApi.delete({
    where: { id },
  })
}

export const StepLensApi: StepLensApiRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepLensApi.findUnique({ where: { id: root?.id } }).step()
  },
}
