import type { Prisma, StepNftCheck } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepNftCheckCreateArgs>({
  stepNftCheck: {
    one: {
      data: {
        step: {
          create: {
            updatedAt: '2023-02-14T18:10:50.931Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-02-14T18:10:50.931Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String4174002',
                        updatedAt: '2023-02-14T18:10:50.931Z',
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
            updatedAt: '2023-02-14T18:10:50.931Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-02-14T18:10:50.931Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String9417847',
                        updatedAt: '2023-02-14T18:10:50.931Z',
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
