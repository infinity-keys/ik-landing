import type { Prisma, Attempt } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AttemptCreateArgs>({
  attempt: {
    one: {
      data: {
        guess: 'String',
        step: {
          create: { updatedAt: '2022-10-24T16:55:47Z', solution: 'String' },
        },
        user: { create: { updatedAt: '2022-10-24T16:55:47Z' } },
      },
    },
    two: {
      data: {
        guess: 'String',
        step: {
          create: { updatedAt: '2022-10-24T16:55:47Z', solution: 'String' },
        },
        user: { create: { updatedAt: '2022-10-24T16:55:47Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Attempt, 'attempt'>
