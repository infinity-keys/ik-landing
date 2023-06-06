import type { Prisma, StepErc20Balance } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepErc20BalanceCreateArgs>({
  stepErc20Balance: {
    one: {
      data: {
        contractAddress: 'String',
        chainId: 'String',
        minBalance: 'String',
        step: {
          create: {
            updatedAt: '2023-06-06T00:43:12.622Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-06-06T00:43:12.622Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String4989380',
                        updatedAt: '2023-06-06T00:43:12.622Z',
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
        contractAddress: 'String',
        chainId: 'String',
        minBalance: 'String',
        step: {
          create: {
            updatedAt: '2023-06-06T00:43:12.622Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-06-06T00:43:12.622Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String7885104',
                        updatedAt: '2023-06-06T00:43:12.622Z',
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

export type StandardScenario = ScenarioData<
  StepErc20Balance,
  'stepErc20Balance'
>
