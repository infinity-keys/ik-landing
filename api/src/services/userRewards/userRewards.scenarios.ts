import type { Prisma, UserReward } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserRewardCreateArgs>({
  userReward: {
    one: {
      data: {
        user: { create: { updatedAt: '2023-02-01T16:37:51.759Z' } },
        rewardable: {
          create: {
            updatedAt: '2023-02-01T16:37:51.759Z',
            name: 'String',
            slug: 'String',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String7266160',
                updatedAt: '2023-02-01T16:37:51.759Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        user: { create: { updatedAt: '2023-02-01T16:37:51.759Z' } },
        rewardable: {
          create: {
            updatedAt: '2023-02-01T16:37:51.759Z',
            name: 'String',
            slug: 'String',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String6433520',
                updatedAt: '2023-02-01T16:37:51.759Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserReward, 'userReward'>
