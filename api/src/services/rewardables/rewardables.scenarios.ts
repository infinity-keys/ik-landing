import type { Prisma, Rewardable } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableCreateArgs>({
  rewardable: {
    one: {
      data: {
        updatedAt: '2022-11-19T06:08:43.070Z',
        name: 'String',
        slug: 'String8681685',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String2782747',
            updatedAt: '2022-11-19T06:08:43.070Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-19T06:08:43.070Z',
        name: 'String',
        slug: 'String5721511',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String5799329',
            updatedAt: '2022-11-19T06:08:43.070Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Rewardable, 'rewardable'>
