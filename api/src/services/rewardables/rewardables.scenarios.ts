import type { Prisma, Rewardable } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableCreateArgs>({
  rewardable: {
    one: {
      data: {
        updatedAt: '2022-11-20T21:02:16.054Z',
        name: 'String',
        slug: 'String9642501',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String1628973',
            updatedAt: '2022-11-20T21:02:16.054Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-20T21:02:16.054Z',
        name: 'String',
        slug: 'String9960641',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String9069477',
            updatedAt: '2022-11-20T21:02:16.054Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Rewardable, 'rewardable'>
