import type { Prisma, StepPage } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepPageCreateArgs>({
  stepPage: {
    one: {
      data: {
        updatedAt: '2023-07-20T17:28:10.862Z',
        body: 'String',
        step: {
          create: {
            updatedAt: '2023-07-20T17:28:10.862Z',
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
                    updatedAt: '2023-07-20T17:28:10.862Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String4697429',
                        updatedAt: '2023-07-20T17:28:10.862Z',
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
        updatedAt: '2023-07-20T17:28:10.862Z',
        body: 'String',
        step: {
          create: {
            updatedAt: '2023-07-20T17:28:10.862Z',
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
                    updatedAt: '2023-07-20T17:28:10.862Z',
                    name: 'String',
                    slug: 'String',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String7935305',
                        updatedAt: '2023-07-20T17:28:10.862Z',
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

export type StandardScenario = ScenarioData<StepPage, 'stepPage'>
