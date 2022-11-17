import type { Prisma, StepSimpleText } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepSimpleTextCreateArgs>({
  stepSimpleText: {
    one: {
      data: {
        solution: 'String',
        step: {
          create: {
            updatedAt: '2022-11-17T01:15:44.846Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-17T01:15:44.846Z',
                    name: 'String',
                    slug: 'String439276',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String5438727',
                        updatedAt: '2022-11-17T01:15:44.846Z',
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
        solution: 'String',
        step: {
          create: {
            updatedAt: '2022-11-17T01:15:44.846Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-17T01:15:44.846Z',
                    name: 'String',
                    slug: 'String1181622',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String6411194',
                        updatedAt: '2022-11-17T01:15:44.846Z',
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

export type StandardScenario = ScenarioData<StepSimpleText, 'stepSimpleText'>
