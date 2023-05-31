import type { Prisma, StepAssetTransfer } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepAssetTransferCreateArgs>({
  stepAssetTransfer: {
    one: {
      data: {
        toAddress: 'String',
        step: {
          create: {
            updatedAt: '2023-05-31T16:26:23.456Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-31T16:26:23.456Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String6968305',
                        updatedAt: '2023-05-31T16:26:23.456Z',
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
        toAddress: 'String',
        step: {
          create: {
            updatedAt: '2023-05-31T16:26:23.456Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2023-05-31T16:26:23.456Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String6378073',
                        updatedAt: '2023-05-31T16:26:23.456Z',
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
  StepAssetTransfer,
  'stepAssetTransfer'
>
