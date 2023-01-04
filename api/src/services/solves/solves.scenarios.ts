import type { Prisma, Solve } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SolveCreateArgs>({
  solve: {
    one: {
      data: {
        user: { create: { updatedAt: '2023-01-04T00:27:49.654Z' } },
        attempt: {
          create: {
            data: { foo: 'bar' },
            user: { create: { updatedAt: '2023-01-04T00:27:49.654Z' } },
            step: {
              create: {
                updatedAt: '2023-01-04T00:27:49.654Z',
                puzzle: {
                  create: {
                    rewardable: {
                      create: {
                        updatedAt: '2023-01-04T00:27:49.654Z',
                        name: 'String',
                        slug: 'String4227549',
                        explanation: 'String',
                        type: 'PUZZLE',
                        organization: {
                          create: {
                            name: 'String',
                            slug: 'String6723499',
                            updatedAt: '2023-01-04T00:27:49.654Z',
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
        user: { create: { updatedAt: '2023-01-04T00:27:49.654Z' } },
        attempt: {
          create: {
            data: { foo: 'bar' },
            user: { create: { updatedAt: '2023-01-04T00:27:49.654Z' } },
            step: {
              create: {
                updatedAt: '2023-01-04T00:27:49.654Z',
                puzzle: {
                  create: {
                    rewardable: {
                      create: {
                        updatedAt: '2023-01-04T00:27:49.654Z',
                        name: 'String',
                        slug: 'String7379113',
                        explanation: 'String',
                        type: 'PUZZLE',
                        organization: {
                          create: {
                            name: 'String',
                            slug: 'String7436144',
                            updatedAt: '2023-01-04T00:27:49.654Z',
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
