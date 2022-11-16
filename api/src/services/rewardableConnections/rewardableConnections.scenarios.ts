import type { Prisma, RewardableConnection } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RewardableConnectionCreateArgs>({
  rewardableConnection: {
    one: {
      data: {
        updatedAt: '2022-11-15T05:32:31.419Z',
        parentRewardable: {
          create: {
            updatedAt: '2022-11-15T05:32:31.419Z',
            name: 'String',
            slug: 'String7006428',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String3194300',
                updatedAt: '2022-11-15T05:32:31.419Z',
              },
            },
          },
        },
        childRewardable: {
          create: {
            updatedAt: '2022-11-15T05:32:31.419Z',
            name: 'String',
            slug: 'String3754242',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String540433',
                updatedAt: '2022-11-15T05:32:31.419Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-15T05:32:31.419Z',
        parentRewardable: {
          create: {
            updatedAt: '2022-11-15T05:32:31.419Z',
            name: 'String',
            slug: 'String8561829',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String7836699',
                updatedAt: '2022-11-15T05:32:31.419Z',
              },
            },
          },
        },
        childRewardable: {
          create: {
            updatedAt: '2022-11-15T05:32:31.419Z',
            name: 'String',
            slug: 'String3965497',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String8157332',
                updatedAt: '2022-11-15T05:32:31.419Z',
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
