import type { MutationResolvers, QueryResolvers } from 'types/graphql'
import { z } from 'zod'

import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { createSolve } from 'src/services/solves/solves'
import { step } from 'src/services/steps/steps'

const SolutionData = z
  .object({
    simpleTextSolution: z.string(),
    // add more types here
  })
  .partial()
  .refine(
    (data) =>
      // add corresponding type here
      data.simpleTextSolution,
    'Invalid solution type'
  )

export const makeAttempt: MutationResolvers['makeAttempt'] = async ({
  stepId,
  data,
}) => {
  try {
    SolutionData.parse(data)

    const attempt = await db.attempt.create({
      data: {
        userId: context?.currentUser.id,
        stepId,
        data,
      },
    })

    const stepType = 'stepSimpleText'
    const solutionType = 'simpleTextSolution'

    const step = await db.step.findUnique({
      where: { id: stepId },
      select: { [stepType]: true },
    })

    const userAttempt = data[solutionType]

    if (step[stepType].solution === userAttempt) {
      await createSolve({
        input: {
          attemptId: attempt.id,
          // userId: 'clcp3dx5z0000l6gv8neydops',
          userId: context.currentUser.id,
        },
      })
      return { success: true }
    }
  } catch (e) {
    console.log(e)
    return { success: false }
  }

  return { success: false }
}

export const optionalStep: QueryResolvers['optionalStep'] = async ({ id }) => {
  if (!id) return

  return step({ id })
}
