import type { Prisma, Rewardable } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableCreateArgs>({
  rewardable: {
    one: {
      data: {
        updatedAt: '2023-01-27T17:45:30.516Z',
        name: 'String',
        slug: 'String',
        explanation: 'String',
        type: 'PUZZLE',
        completed: true,
        claimed: true,
        organization: {
          create: {
            name: 'String',
            slug: 'String7037733',
            updatedAt: '2023-01-27T17:45:30.516Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-01-27T17:45:30.516Z',
        name: 'String',
        slug: 'String',
        explanation: 'String',
        type: 'PUZZLE',
        completed: true,
        claimed: true,
        organization: {
          create: {
            name: 'String',
            slug: 'String9674317',
            updatedAt: '2023-01-27T17:45:30.516Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Rewardable, 'rewardable'>
