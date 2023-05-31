import type {
  QueryResolvers,
  MutationResolvers,
  StepAssetTransferRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepAssetTransfers: QueryResolvers['stepAssetTransfers'] = () => {
  return db.stepAssetTransfer.findMany()
}

export const stepAssetTransfer: QueryResolvers['stepAssetTransfer'] = ({
  id,
}) => {
  return db.stepAssetTransfer.findUnique({
    where: { id },
  })
}

export const createStepAssetTransfer: MutationResolvers['createStepAssetTransfer'] =
  ({ input }) => {
    return db.stepAssetTransfer.create({
      data: input,
    })
  }

export const updateStepAssetTransfer: MutationResolvers['updateStepAssetTransfer'] =
  ({ id, input }) => {
    return db.stepAssetTransfer.update({
      data: input,
      where: { id },
    })
  }

export const deleteStepAssetTransfer: MutationResolvers['deleteStepAssetTransfer'] =
  ({ id }) => {
    return db.stepAssetTransfer.delete({
      where: { id },
    })
  }

export const StepAssetTransfer: StepAssetTransferRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepAssetTransfer.findUnique({ where: { id: root?.id } }).step()
  },
}
