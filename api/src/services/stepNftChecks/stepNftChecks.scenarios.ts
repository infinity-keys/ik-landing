import type { Prisma, StepNftCheck } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepNftCheckCreateArgs>({
  stepNftCheck: {
    one: {
      data: {
        step: {
          create: {
            updatedAt: '2023-01-31T19:30:56.560Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-01-31T19:30:56.560Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String4620482',
                        updatedAt: '2023-01-31T19:30:56.560Z',
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
            updatedAt: '2023-01-31T19:30:56.560Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-01-31T19:30:56.560Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String3888528',
                        updatedAt: '2023-01-31T19:30:56.560Z',
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

export type StandardScenario = ScenarioData<StepNftCheck, 'stepNftCheck'>
