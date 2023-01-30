import type { Prisma, StepNftCheck } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepNftCheckCreateArgs>({
  stepNftCheck: {
    one: {
      data: {
        step: {
          create: {
            updatedAt: '2023-01-27T21:38:27.373Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-01-27T21:38:27.373Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String7259102',
                        updatedAt: '2023-01-27T21:38:27.373Z',
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
            updatedAt: '2023-01-27T21:38:27.373Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-01-27T21:38:27.373Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String1992641',
                        updatedAt: '2023-01-27T21:38:27.373Z',
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
