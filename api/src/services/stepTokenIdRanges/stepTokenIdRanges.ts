import type {
  QueryResolvers,
  MutationResolvers,
  StepTokenIdRangeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stepTokenIdRanges: QueryResolvers['stepTokenIdRanges'] = () => {
  return db.stepTokenIdRange.findMany()
}

export const stepTokenIdRange: QueryResolvers['stepTokenIdRange'] = ({
  id,
}) => {
  return db.stepTokenIdRange.findUnique({
    where: { id },
  })
}

export const createStepTokenIdRange: MutationResolvers['createStepTokenIdRange'] =
  ({ input }) => {
    return db.stepTokenIdRange.create({
      data: input,
    })
  }

export const updateStepTokenIdRange: MutationResolvers['updateStepTokenIdRange'] =
  ({ id, input }) => {
    return db.stepTokenIdRange.update({
      data: input,
      where: { id },
    })
  }

export const deleteStepTokenIdRange: MutationResolvers['deleteStepTokenIdRange'] =
  ({ id }) => {
    return db.stepTokenIdRange.delete({
      where: { id },
    })
  }

export const StepTokenIdRange: StepTokenIdRangeRelationResolvers = {
  step: (_obj, { root }) => {
    return db.stepTokenIdRange.findUnique({ where: { id: root?.id } }).step()
  },
}
