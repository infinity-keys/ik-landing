import type { Prisma, Solve } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SolveCreateArgs>({
  solve: {
    one: {
      data: {
        user: { create: { updatedAt: '2023-01-05T19:14:19.285Z' } },
        attempt: {
          create: {
            data: { foo: 'bar' },
            user: { create: { updatedAt: '2023-01-05T19:14:19.285Z' } },
            step: {
              create: {
                updatedAt: '2023-01-05T19:14:19.285Z',
                puzzle: {
                  create: {
                    rewardable: {
                      create: {
                        updatedAt: '2023-01-05T19:14:19.285Z',
                        name: 'String',
                        slug: 'String8156020',
                        explanation: 'String',
                        type: 'PUZZLE',
                        organization: {
                          create: {
                            name: 'String',
                            slug: 'String9133493',
                            updatedAt: '2023-01-05T19:14:19.285Z',
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
    },
    two: {
      data: {
        user: { create: { updatedAt: '2023-01-05T19:14:19.285Z' } },
        attempt: {
          create: {
            data: { foo: 'bar' },
            user: { create: { updatedAt: '2023-01-05T19:14:19.285Z' } },
            step: {
              create: {
                updatedAt: '2023-01-05T19:14:19.285Z',
                puzzle: {
                  create: {
                    rewardable: {
                      create: {
                        updatedAt: '2023-01-05T19:14:19.285Z',
                        name: 'String',
                        slug: 'String4974158',
                        explanation: 'String',
                        type: 'PUZZLE',
                        organization: {
                          create: {
                            name: 'String',
                            slug: 'String3239357',
                            updatedAt: '2023-01-05T19:14:19.285Z',
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
    },
  },
})

export type StandardScenario = ScenarioData<Solve, 'solve'>
