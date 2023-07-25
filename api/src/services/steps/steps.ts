import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import cookie from 'cookie'
import type {
  QueryResolvers,
  MutationResolvers,
  StepRelationResolvers,
} from 'types/graphql'

import { context } from '@redwoodjs/graphql-server'

import { PuzzlesData } from 'src/lib/cookie'
import { db } from 'src/lib/db'
import { decryptCookie } from 'src/lib/encoding/encoding'

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
  stepNftCheck: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).stepNftCheck()
  },
  stepFunctionCall: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).stepFunctionCall()
  },
  stepComethApi: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).stepComethApi()
  },
  stepTokenIdRange: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).stepTokenIdRange()
  },
  stepOriumApi: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).stepOriumApi()
  },
  stepAssetTransfer: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).stepAssetTransfer()
  },
  stepLensApi: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).stepLensApi()
  },
  stepErc20Balance: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).stepErc20Balance()
  },
  attempts: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).attempts()
  },
  stepPage: (_obj, { root }) => {
    return db.step
      .findUnique({ where: { id: root?.id } })
      .stepPage({ orderBy: { sortWeight: 'asc' } })
  },
  /*
   * These `completedStep` resolvers allow us to check via graphQL whether a
   * user has solved any given step.
   */
  hasUserCompletedStep: async (_obj, { root }) => {
    // Only authenticated users can hit the db
    if (!context.currentUser) {
      return false
    }

    const solve = await db.step
      .findUnique({ where: { id: root?.id } })
      .attempts({
        where: {
          userId: context.currentUser.id,
          solve: {
            isNot: null,
          },
        },
      })

    return solve.length > 0
  },
}
