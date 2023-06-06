import type {
  QueryResolvers,
  MutationResolvers,
  StepErc20BalanceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepErc20Balances: QueryResolvers['stepErc20Balances'] = () => {
  return db.stepErc20Balance.findMany()
}

export const stepErc20Balance: QueryResolvers['stepErc20Balance'] = ({
  id,
}) => {
  return db.stepErc20Balance.findUnique({
    where: { id },
  })
}

export const createStepErc20Balance: MutationResolvers['createStepErc20Balance'] =
  ({ input }) => {
    return db.stepErc20Balance.create({
      data: input,
    })
  }

export const updateStepErc20Balance: MutationResolvers['updateStepErc20Balance'] =
  ({ id, input }) => {
    return db.stepErc20Balance.update({
      data: input,
      where: { id },
    })
  }

export const deleteStepErc20Balance: MutationResolvers['deleteStepErc20Balance'] =
  ({ id }) => {
    return db.stepErc20Balance.delete({
      where: { id },
    })
  }

export const StepErc20Balance: StepErc20BalanceRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepErc20Balance.findUnique({ where: { id: root?.id } }).step()
  },
}
