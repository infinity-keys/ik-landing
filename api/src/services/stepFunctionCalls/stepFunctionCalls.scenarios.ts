import type { Prisma, StepFunctionCall } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepFunctionCallCreateArgs>({
  stepFunctionCall: {
    one: {
      data: {
        methodIds: 'String',
        step: {
          create: {
            updatedAt: '2023-03-23T18:03:39.989Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-03-23T18:03:39.989Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String9537608',
                        updatedAt: '2023-03-23T18:03:39.989Z',
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
        methodIds: 'String',
        step: {
          create: {
            updatedAt: '2023-03-23T18:03:39.989Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-03-23T18:03:39.989Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String7994191',
                        updatedAt: '2023-03-23T18:03:39.989Z',
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
  StepFunctionCall,
  'stepFunctionCall'
>
