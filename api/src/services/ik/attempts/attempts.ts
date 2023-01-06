import type { MutationResolvers } from 'types/graphql'
import { z } from 'zod'

import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { createSolve } from 'src/services/solves/solves'

const SolutionData = z
  .object({
    simpleTextSolution: z.string(),
    test: z.string(),
  })
  .partial()
  .refine(
    (data) => data.simpleTextSolution || data.test,
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
          userId: 'clcgie35q0011l6e5tstfjy69',
          //  context.currentUser.id
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
