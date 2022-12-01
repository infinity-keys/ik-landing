import type { Prisma, Attempt } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AttemptCreateArgs>({
  attempt: {
    one: {
      data: {
        data: { foo: 'bar' },
        user: { create: { updatedAt: '2022-11-21T02:51:26.587Z' } },
        step: {
          create: {
            updatedAt: '2022-11-21T02:51:26.587Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-21T02:51:26.587Z',
                    name: 'String',
                    slug: 'String9229304',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String6504332',
                        updatedAt: '2022-11-21T02:51:26.587Z',
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
        user: { create: { updatedAt: '2022-11-21T02:51:26.587Z' } },
        step: {
          create: {
            updatedAt: '2022-11-21T02:51:26.587Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-21T02:51:26.587Z',
                    name: 'String',
                    slug: 'String615633',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String1111149',
                        updatedAt: '2022-11-21T02:51:26.587Z',
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
