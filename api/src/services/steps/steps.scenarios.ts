import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        updatedAt: '2023-04-04T15:23:01.718Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2023-04-04T15:23:01.718Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String8601350',
                    updatedAt: '2023-04-04T15:23:01.718Z',
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
        updatedAt: '2023-04-04T15:23:01.718Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2023-04-04T15:23:01.718Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String9500531',
                    updatedAt: '2023-04-04T15:23:01.718Z',
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
