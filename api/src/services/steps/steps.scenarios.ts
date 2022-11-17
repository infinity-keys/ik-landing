import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        updatedAt: '2022-11-17T01:25:01.272Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2022-11-17T01:25:01.272Z',
                name: 'String',
                slug: 'String1241619',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String2535063',
                    updatedAt: '2022-11-17T01:25:01.272Z',
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
        updatedAt: '2022-11-17T01:25:01.272Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2022-11-17T01:25:01.272Z',
                name: 'String',
                slug: 'String6884399',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String7956964',
                    updatedAt: '2022-11-17T01:25:01.272Z',
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
