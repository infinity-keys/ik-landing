import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        updatedAt: '2023-03-14T22:09:24.273Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2023-03-14T22:09:24.273Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String1587506',
                    updatedAt: '2023-03-14T22:09:24.273Z',
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
        updatedAt: '2023-03-14T22:09:24.273Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2023-03-14T22:09:24.273Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String2574428',
                    updatedAt: '2023-03-14T22:09:24.273Z',
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

export type StandardScenario = ScenarioData<Step, 'step'>
