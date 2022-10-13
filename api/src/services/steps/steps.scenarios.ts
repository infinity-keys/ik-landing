import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        solution: 'String',
        puzzle: {
          create: {
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 3176647,
          },
        },
      },
    },
    two: {
      data: {
        solution: 'String',
        puzzle: {
          create: {
            path: 'String',
            rewardNft: 'String',
            listSortWeight: 1593212,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Step, 'step'>
