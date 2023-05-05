import type { Prisma, StepComethApi } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepComethApiCreateArgs>({
  stepComethApi: {
    one: {
      data: {
        step: {
          create: {
            updatedAt: '2023-03-31T18:15:01.240Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-03-31T18:15:01.240Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String2712480',
                        updatedAt: '2023-03-31T18:15:01.240Z',
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
        step: {
          create: {
            updatedAt: '2023-03-31T18:15:01.240Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-03-31T18:15:01.240Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String5462315',
                        updatedAt: '2023-03-31T18:15:01.240Z',
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

export type StandardScenario = ScenarioData<StepComethApi, 'stepComethApi'>
