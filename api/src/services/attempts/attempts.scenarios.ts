import type { Prisma, Attempt } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AttemptCreateArgs>({
  attempt: {
    one: {
      data: {
        guess: 'String',
        step: { create: { solution: 'String' } },
        user: { create: {} },
      },
    },
    two: {
      data: {
        guess: 'String',
        step: { create: { solution: 'String' } },
        user: { create: {} },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Attempt, 'attempt'>
