import type { Prisma, StepTokenIdRange } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepTokenIdRangeCreateArgs>({
  stepTokenIdRange: {
    one: {
      data: {
        contractAddress: 'String',
        chainId: 'String',
        startId: 4779953,
        endId: 651781,
        startIds: 3341448,
        endIds: 866907,
        step: {
          create: {
            updatedAt: '2023-06-01T00:25:04.326Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-06-01T00:25:04.326Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String144203',
                        updatedAt: '2023-06-01T00:25:04.326Z',
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
        startId: 9445035,
        endId: 97061,
        startIds: 7568216,
        endIds: 2301032,
        step: {
          create: {
            updatedAt: '2023-06-01T00:25:04.326Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-06-01T00:25:04.326Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String4182011',
                        updatedAt: '2023-06-01T00:25:04.326Z',
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
