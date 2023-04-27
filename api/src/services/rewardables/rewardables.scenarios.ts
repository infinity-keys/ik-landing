import type { Prisma, Rewardable } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableCreateArgs>({
  rewardable: {
    one: {
      data: {
        updatedAt: '2023-02-13T21:25:09.412Z',
        name: 'String',
        slug: 'String',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String6482122',
            updatedAt: '2023-02-13T21:25:09.412Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-02-13T21:25:09.412Z',
        name: 'String',
        slug: 'String',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String6809316',
            updatedAt: '2023-02-13T21:25:09.412Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Rewardable, 'rewardable'>
