import type { Prisma, StepLensApi } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepLensApiCreateArgs>({
  stepLensApi: {
    one: {
      data: {
        checkType: 'HAS_COMPLETED_PROFILE',
        step: {
          create: {
            updatedAt: '2023-05-26T19:32:07.770Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-26T19:32:07.770Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String1495510',
                        updatedAt: '2023-05-26T19:32:07.770Z',
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
            updatedAt: '2023-05-26T19:32:07.771Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-26T19:32:07.771Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String2083551',
                        updatedAt: '2023-05-26T19:32:07.771Z',
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
