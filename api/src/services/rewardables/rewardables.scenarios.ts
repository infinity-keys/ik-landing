import type { Prisma, Rewardable } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableCreateArgs>({
  rewardable: {
    one: {
      data: {
        updatedAt: '2022-11-18T23:10:57.714Z',
        name: 'String',
        slug: 'String1207433',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String3688402',
            updatedAt: '2022-11-18T23:10:57.714Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-18T23:10:57.714Z',
        name: 'String',
        slug: 'String2638569',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String8308107',
            updatedAt: '2022-11-18T23:10:57.714Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Rewardable, 'rewardable'>
