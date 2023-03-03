import { PUZZLE_COOKIE_NAME } from '@infinity-keys/constants'
import cookie from 'cookie'
import type {
  QueryResolvers,
  MutationResolvers,
  StepRelationResolvers,
} from 'types/graphql'

// import { context } from '@redwoodjs/graphql-server'

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
  attempts: (_obj, { root }) => {
    return db.step.findUnique({ where: { id: root?.id } }).attempts({
      where: {
        userId: context.currentUser.id,
      },
    })
  },
  hasUserCompletedStep: async (_obj, { root }) => {
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
  hasAnonUserCompletedStep: async (_obj, { root, context: resolverCtx }) => {
    if (context.currentUser) {
      return false
    }

    const puzzlesCompletedCypherText = cookie.parse(
      resolverCtx.event?.headers?.cookie || ''
    )[PUZZLE_COOKIE_NAME]

    const puzzlesCompleted = decryptCookie(puzzlesCompletedCypherText)
    // no cookie, no solve
    if (!puzzlesCompleted) return false

    PuzzlesData.parse(puzzlesCompleted)

    const cookieSteps = puzzlesCompleted.puzzles[root?.puzzleId]?.steps

    // no cookie for this puzzle
    if (!cookieSteps || cookieSteps.length === 0) return false

    // is this step id in the user's cookie
    return cookieSteps.includes(root?.id)
  },
}
