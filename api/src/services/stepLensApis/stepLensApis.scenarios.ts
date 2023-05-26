import type { Prisma, StepLensApi } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepLensApiCreateArgs>({
  stepLensApi: {
    one: {
      data: {
        checkType: 'HAS_COMPLETED_PROFILE',
        step: {
          create: {
            updatedAt: '2023-05-26T16:39:45.852Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-26T16:39:45.852Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String6467582',
                        updatedAt: '2023-05-26T16:39:45.852Z',
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
        checkType: 'HAS_COMPLETED_PROFILE',
        step: {
          create: {
            updatedAt: '2023-05-26T16:39:45.852Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-26T16:39:45.852Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String6455904',
                        updatedAt: '2023-05-26T16:39:45.852Z',
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

export type StandardScenario = ScenarioData<StepLensApi, 'stepLensApi'>
