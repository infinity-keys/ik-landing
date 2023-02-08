import type { Prisma, Rewardable } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableCreateArgs>({
  rewardable: {
    one: {
      data: {
        updatedAt: '2023-02-01T18:11:39.771Z',
        name: 'String',
        slug: 'String',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String8343568',
            updatedAt: '2023-02-01T18:11:39.771Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-02-01T18:11:39.771Z',
        name: 'String',
        slug: 'String',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String3561642',
            updatedAt: '2023-02-01T18:11:39.771Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Rewardable, 'rewardable'>
