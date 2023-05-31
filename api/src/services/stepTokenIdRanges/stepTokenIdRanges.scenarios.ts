import type { Prisma, StepTokenIdRange } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepTokenIdRangeCreateArgs>({
  stepTokenIdRange: {
    one: {
      data: {
        contractAddress: 'String',
        chainId: 'String',
        startId: 8089036,
        endId: 9817442,
        startIds: 562936,
        endIds: 1358962,
        step: {
          create: {
            updatedAt: '2023-05-31T17:13:39.847Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-31T17:13:39.847Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String9247192',
                        updatedAt: '2023-05-31T17:13:39.848Z',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        contractAddress: 'String',
        chainId: 'String',
        startId: 5203780,
        endId: 6260581,
        startIds: 2939000,
        endIds: 6927970,
        step: {
          create: {
            updatedAt: '2023-05-31T17:13:39.848Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-31T17:13:39.848Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String1523627',
                        updatedAt: '2023-05-31T17:13:39.848Z',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  StepTokenIdRange,
  'stepTokenIdRange'
>
