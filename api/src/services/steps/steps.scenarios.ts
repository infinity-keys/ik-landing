import type { Prisma, Step } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        updatedAt: '2023-07-20T17:30:29.806Z',
        solutionHint: 'String',
        defaultImage: 'String',
        solutionImage: 'String',
        category: 'SEEK',
        puzzle: {
          create: {
            requirements: 'HOLDERS',
            coverImage: 'String',
            rewardable: {
              create: {
                updatedAt: '2023-07-20T17:30:29.806Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String5141186',
                    updatedAt: '2023-07-20T17:30:29.806Z',
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
        updatedAt: '2023-07-20T17:30:29.806Z',
        solutionHint: 'String',
        defaultImage: 'String',
        solutionImage: 'String',
        category: 'SEEK',
        puzzle: {
          create: {
            requirements: 'HOLDERS',
            coverImage: 'String',
            rewardable: {
              create: {
                updatedAt: '2023-07-20T17:30:29.806Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String3376490',
                    updatedAt: '2023-07-20T17:30:29.806Z',
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
