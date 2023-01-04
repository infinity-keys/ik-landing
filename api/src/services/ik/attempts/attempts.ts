import type { MutationResolvers, QueryResolvers } from 'types/graphql'

// import { AuthenticationError } from '@redwoodjs/graphql-server'
import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const makeAttempt: MutationResolvers['makeAttempt'] = ({
  stepId,
  data,
}) => {
  return db.attempt.create({
    data: {
      userId: context?.currentUser.id,
      stepId,
      data,
    },
  })
}

export const getStepsByPuzzleId: QueryResolvers['stepsByPuzzleId'] = async ({
  id,
}) => {
  const puzzleData = await db.puzzle.findUnique({
    where: { id: 'clcf3zxj201djl6khqo94kuz1' },
    include: {
      steps: {
        include: {
          stepSimpleText: true,
        },
      },
    },
  })

  const stepData = puzzleData.steps.map(
    ({ id, stepSortWeight, stepSimpleText, type }) => {
      return {
        step: { id, stepSortWeight },
        data: {
          path: ['simpleTextSolution'],
          equals: stepSimpleText.solution,
        },
      }
    }
  )

  const solvedSteps = await db.attempt.findMany({
    where: {
      user: { id: 'clcf5fosv0000l6mzsjzpr8u4' },
      OR: stepData,
    },
  })

  const stepProgress = stepData.map(({ step }) => {
    const solved = solvedSteps.some(({ stepId }) => stepId === step.id)
    return {
      stepId: step.id,
      stepSortWeight: step.stepSortWeight,
      solved,
    }
  })

  return {
    puzzle: puzzleData,
    stepProgress,
  }
}
