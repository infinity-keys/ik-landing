import type {
  QueryResolvers,
  MutationResolvers,
  StepRelationResolvers,
} from 'types/graphql'

// import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const steps: QueryResolvers['steps'] = () => {
  return db.step.findMany({
    orderBy: {
      stepSortWeight: 'asc',
    },
  })
}

export const step: QueryResolvers['step'] = ({ id }) => {
  return db.step.findUnique({
    where: { id },
  })
}

export const createStep: MutationResolvers['createStep'] = ({ input }) => {
  return db.step.create({
    data: input,
  })
}

export const updateStep: MutationResolvers['updateStep'] = ({ id, input }) => {
  return db.step.update({
    data: input,
    where: { id },
  })
}

export const deleteStep: MutationResolvers['deleteStep'] = ({ id }) => {
  return db.step.delete({
    where: { id },
  })
}

export const Step: StepRelationResolvers = {
  puzzle: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).puzzle()
  },
  stepSimpleText: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).stepSimpleText()
  },
  attempts: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).attempts({
      where: {
        userId: 'clcp3dx5z0000l6gv8neydops',
        //  context.currentUser.id
      },
    })
  },
  hasUserCompletedStep: async (_obj, { root }) => {
    const solve = await db.step
      .findUnique({ where: { id: root?.id } })
      .attempts({
        where: {
          userId: 'clcp3dx5z0000l6gv8neydops',
          //  context.currentUser.id
          solve: {
            isNot: null,
          },
        },
      })

    return solve.length > 0
  },
}
