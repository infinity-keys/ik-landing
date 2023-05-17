import type { Prisma, StepOriumApi } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepOriumApiCreateArgs>({
  stepOriumApi: {
    one: {
      data: {
        checkType: 'HAS_CREATED_VAULT',
        step: {
          create: {
            updatedAt: '2023-05-17T19:41:04.232Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-17T19:41:04.232Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String3816610',
                        updatedAt: '2023-05-17T19:41:04.233Z',
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
        checkType: 'HAS_CREATED_VAULT',
        step: {
          create: {
            updatedAt: '2023-05-17T19:41:04.233Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-17T19:41:04.233Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String8253454',
                        updatedAt: '2023-05-17T19:41:04.233Z',
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

export type StandardScenario = ScenarioData<StepOriumApi, 'stepOriumApi'>
