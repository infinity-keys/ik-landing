import type { Prisma, Rewardable } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableCreateArgs>({
  rewardable: {
    one: {
      data: {
        updatedAt: '2022-11-17T01:15:04.024Z',
        name: 'String',
        slug: 'String9057011',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String6232178',
            updatedAt: '2022-11-17T01:15:04.024Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-17T01:15:04.024Z',
        name: 'String',
        slug: 'String407707',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String1930288',
            updatedAt: '2022-11-17T01:15:04.024Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Rewardable, 'rewardable'>
