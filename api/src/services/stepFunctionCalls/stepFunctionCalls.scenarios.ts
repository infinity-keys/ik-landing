import type { Prisma, StepFunctionCall } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepFunctionCallCreateArgs>({
  stepFunctionCall: {
    one: {
      data: {
        methodIds: 'String',
        step: {
          create: {
            updatedAt: '2023-03-23T18:20:06.476Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-03-23T18:20:06.476Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String2441103',
                        updatedAt: '2023-03-23T18:20:06.476Z',
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
            updatedAt: '2023-03-23T18:20:06.476Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-03-23T18:20:06.476Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String5609739',
                        updatedAt: '2023-03-23T18:20:06.476Z',
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
