import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        updatedAt: '2023-03-23T18:04:10.055Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2023-03-23T18:04:10.055Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String474894',
                    updatedAt: '2023-03-23T18:04:10.055Z',
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
        updatedAt: '2023-03-23T18:04:10.055Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2023-03-23T18:04:10.056Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String9065079',
                    updatedAt: '2023-03-23T18:04:10.056Z',
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
