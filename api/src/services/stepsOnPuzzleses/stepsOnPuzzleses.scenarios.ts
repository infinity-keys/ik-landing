import type { Prisma, StepsOnPuzzles } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepsOnPuzzlesCreateArgs>({
  stepsOnPuzzles: {
    one: {
      data: {
        updatedAt: '2022-10-24T17:00:06Z',
        step: {
          create: { updatedAt: '2022-10-24T17:00:06Z', solution: 'String' },
        },
        puzzle: {
          create: {
            updatedAt: '2022-10-24T17:00:06Z',
            puzzleName: 'String',
            path: 'String',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-10-24T17:00:06Z',
        step: {
          create: { updatedAt: '2022-10-24T17:00:06Z', solution: 'String' },
        },
        puzzle: {
          create: {
            updatedAt: '2022-10-24T17:00:06Z',
            puzzleName: 'String',
            path: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<StepsOnPuzzles, 'stepsOnPuzzles'>
