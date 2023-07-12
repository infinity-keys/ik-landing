import type { Prisma, Step } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        updatedAt: '2023-07-12T15:53:40.238Z',
        featuredImage: 'String',
        body: 'String',
        hint: 'String',
        category: 'SEEK',
        requirements: 'HOLDERS',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2023-07-12T15:53:40.238Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String2853175',
                    updatedAt: '2023-07-12T15:53:40.238Z',
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
        updatedAt: '2023-07-12T15:53:40.238Z',
        featuredImage: 'String',
        body: 'String',
        hint: 'String',
        category: 'SEEK',
        requirements: 'HOLDERS',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2023-07-12T15:53:40.238Z',
                name: 'String',
                slug: 'String',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String5468217',
                    updatedAt: '2023-07-12T15:53:40.238Z',
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
