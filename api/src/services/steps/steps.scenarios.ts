import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        solution: 'String',
        puzzle: {
          create: {
            puzzleName: 'String',
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 5602892,
          },
        },
      },
    },
    two: {
      data: {
        solution: 'String',
        puzzle: {
          create: {
            puzzleName: 'String',
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 2527371,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Step, 'step'>
