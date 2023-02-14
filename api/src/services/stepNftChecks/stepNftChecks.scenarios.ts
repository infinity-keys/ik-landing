import type { Prisma, StepNftCheck } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepNftCheckCreateArgs>({
  stepNftCheck: {
    one: {
      data: {
        step: {
          create: {
            updatedAt: '2023-02-14T20:17:17.293Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-02-14T20:17:17.293Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String2700962',
                        updatedAt: '2023-02-14T20:17:17.293Z',
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
            updatedAt: '2023-02-14T20:17:17.293Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-02-14T20:17:17.293Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String3678450',
                        updatedAt: '2023-02-14T20:17:17.293Z',
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
