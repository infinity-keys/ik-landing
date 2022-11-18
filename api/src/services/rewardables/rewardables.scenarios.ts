import type { Prisma, Rewardable } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableCreateArgs>({
  rewardable: {
    one: {
      data: {
        updatedAt: '2022-11-18T07:07:03.962Z',
        name: 'String',
        slug: 'String1595836',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String9896054',
            updatedAt: '2022-11-18T07:07:03.962Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-18T07:07:03.962Z',
        name: 'String',
        slug: 'String276767',
        explanation: 'String',
        type: 'PUZZLE',
        organization: {
          create: {
            name: 'String',
            slug: 'String4193619',
            updatedAt: '2022-11-18T07:07:03.962Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Rewardable, 'rewardable'>
