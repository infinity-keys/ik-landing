import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: { data: { solution: 'String' } },
    two: { data: { solution: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Step, 'step'>
