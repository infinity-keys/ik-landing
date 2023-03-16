import type { Prisma, RewardableConnection } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableConnectionCreateArgs>({
  rewardableConnection: {
    one: {
      data: {
        updatedAt: '2022-11-18T23:11:05.478Z',
        parentRewardable: {
          create: {
            updatedAt: '2022-11-18T23:11:05.478Z',
            name: 'String',
            slug: 'String4736511',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String4264382',
                updatedAt: '2022-11-18T23:11:05.478Z',
              },
            },
          },
        },
        childRewardable: {
          create: {
            updatedAt: '2022-11-18T23:11:05.478Z',
            name: 'String',
            slug: 'String5215801',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String4892867',
                updatedAt: '2022-11-18T23:11:05.478Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-18T23:11:05.478Z',
        parentRewardable: {
          create: {
            updatedAt: '2022-11-18T23:11:05.478Z',
            name: 'String',
            slug: 'String9776518',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String7591604',
                updatedAt: '2022-11-18T23:11:05.478Z',
              },
            },
          },
        },
        childRewardable: {
          create: {
            updatedAt: '2022-11-18T23:11:05.478Z',
            name: 'String',
            slug: 'String1834228',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String1922143',
                updatedAt: '2022-11-18T23:11:05.478Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  RewardableConnection,
  'rewardableConnection'
>
