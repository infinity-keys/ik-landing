import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: { data: { updatedAt: '2022-10-24T17:00:55Z', solution: 'String' } },
    two: { data: { updatedAt: '2022-10-24T17:00:55Z', solution: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Step, 'step'>
