import type { Prisma, StepLensApi } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepLensApiCreateArgs>({
  stepLensApi: {
    one: {
      data: {
        checkType: 'HAS_COMPLETED_PROFILE',
        followedUserIds: 'String',
        step: {
          create: {
            updatedAt: '2023-06-06T17:56:52.420Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-06-06T17:56:52.420Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String9681682',
                        updatedAt: '2023-06-06T17:56:52.420Z',
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
        followedUserIds: 'String',
        step: {
          create: {
            updatedAt: '2023-06-06T17:56:52.420Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-06-06T17:56:52.420Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String9183812',
                        updatedAt: '2023-06-06T17:56:52.420Z',
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
