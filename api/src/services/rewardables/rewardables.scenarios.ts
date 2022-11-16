import type { Prisma, Rewardable } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableCreateArgs>({
  rewardable: {
    one: {
      data: {
        updatedAt: '2022-11-15T05:25:53.693Z',
        name: 'String',
        slug: 'String7536138',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String831861',
            updatedAt: '2022-11-15T05:25:53.693Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-15T05:25:53.693Z',
        name: 'String',
        slug: 'String4695717',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String4914799',
            updatedAt: '2022-11-15T05:25:53.693Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Rewardable, 'rewardable'>
