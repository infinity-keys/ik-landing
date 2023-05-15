import type { Prisma, StepTokenIdRange } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepTokenIdRangeCreateArgs>({
  stepTokenIdRange: {
    one: {
      data: {
        contractAddress: 'String',
        chainId: 'String',
        startId: 1119622,
        endId: 8654833,
        step: {
          create: {
            updatedAt: '2023-04-04T15:21:47.406Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-04-04T15:21:47.406Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String1024534',
                        updatedAt: '2023-04-04T15:21:47.406Z',
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
        startId: 4184651,
        endId: 3125558,
        step: {
          create: {
            updatedAt: '2023-04-04T15:21:47.406Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-04-04T15:21:47.406Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String1220241',
                        updatedAt: '2023-04-04T15:21:47.406Z',
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
