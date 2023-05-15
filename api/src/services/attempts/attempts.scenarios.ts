import type { Prisma, Attempt } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AttemptCreateArgs>({
  attempt: {
    one: {
      data: {
        data: { foo: 'bar' },
        user: { create: { updatedAt: '2023-01-05T19:12:21.856Z' } },
        step: {
          create: {
            updatedAt: '2023-01-05T19:12:21.856Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-01-05T19:12:21.856Z',
                    name: 'String',
                    slug: 'String777450',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String1306262',
                        updatedAt: '2023-01-05T19:12:21.856Z',
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
        user: { create: { updatedAt: '2023-01-05T19:12:21.856Z' } },
        step: {
          create: {
            updatedAt: '2023-01-05T19:12:21.856Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-01-05T19:12:21.856Z',
                    name: 'String',
                    slug: 'String3062565',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String4096452',
                        updatedAt: '2023-01-05T19:12:21.856Z',
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
