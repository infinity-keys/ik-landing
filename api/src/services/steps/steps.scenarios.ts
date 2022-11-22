import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        updatedAt: '2022-11-21T02:50:48.041Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2022-11-21T02:50:48.041Z',
                name: 'String',
                slug: 'String6009042',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String6435289',
                    updatedAt: '2022-11-21T02:50:48.041Z',
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
        updatedAt: '2022-11-21T02:50:48.041Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2022-11-21T02:50:48.042Z',
                name: 'String',
                slug: 'String6752564',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String3807932',
                    updatedAt: '2022-11-21T02:50:48.042Z',
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
