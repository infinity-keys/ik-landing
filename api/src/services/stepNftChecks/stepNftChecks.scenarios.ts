import type { Prisma, StepNftCheck } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepNftCheckCreateArgs>({
  stepNftCheck: {
    one: {
      data: {
        step: {
          create: {
            updatedAt: '2023-02-14T21:59:02.661Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-02-14T21:59:02.661Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String6185988',
                        updatedAt: '2023-02-14T21:59:02.661Z',
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
            updatedAt: '2023-02-14T21:59:02.661Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-02-14T21:59:02.661Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String5181061',
                        updatedAt: '2023-02-14T21:59:02.661Z',
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
