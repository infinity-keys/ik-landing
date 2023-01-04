import type { Prisma, Attempt } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AttemptCreateArgs>({
  attempt: {
    one: {
      data: {
        data: { foo: 'bar' },
        user: { create: { updatedAt: '2023-01-04T00:49:52.528Z' } },
        step: {
          create: {
            updatedAt: '2023-01-04T00:49:52.528Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-01-04T00:49:52.528Z',
                    name: 'String',
                    slug: 'String511347',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String2376711',
                        updatedAt: '2023-01-04T00:49:52.528Z',
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
        data: { foo: 'bar' },
        user: { create: { updatedAt: '2023-01-04T00:49:52.528Z' } },
        step: {
          create: {
            updatedAt: '2023-01-04T00:49:52.528Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-01-04T00:49:52.528Z',
                    name: 'String',
                    slug: 'String1023348',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String917288',
                        updatedAt: '2023-01-04T00:49:52.528Z',
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

export type StandardScenario = ScenarioData<Attempt, 'attempt'>
