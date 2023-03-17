import type {
  QueryResolvers,
  MutationResolvers,
  StepNftCheckRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepNftChecks: QueryResolvers['stepNftChecks'] = () => {
  return db.stepNftCheck.findMany()
}

export const stepNftCheck: QueryResolvers['stepNftCheck'] = ({ id }) => {
  return db.stepNftCheck.findUnique({
    where: { id },
  })
}

export const createStepNftCheck: MutationResolvers['createStepNftCheck'] = ({
  input,
}) => {
  return db.stepNftCheck.create({
    data: input,
  })
}

export const updateStepNftCheck: MutationResolvers['updateStepNftCheck'] = ({
  id,
  input,
}) => {
  return db.stepNftCheck.update({
    data: input,
    where: { id },
  })
}

export const deleteStepNftCheck: MutationResolvers['deleteStepNftCheck'] = ({
  id,
}) => {
  return db.stepNftCheck.delete({
    where: { id },
  })
}

export const StepNftCheck: StepNftCheckRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepNftCheck.findUnique({ where: { id: root?.id } }).step()
  },
  nftCheckData: (_obj, { root }) => {
    return db.stepNftCheck
      .findUnique({ where: { id: root?.id } })
      .nftCheckData()
  },
}
