import type { Prisma, StepSimpleText } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepSimpleTextCreateArgs>({
  stepSimpleText: {
    one: {
      data: {
        solution: 'String',
        step: {
          create: {
            updatedAt: '2022-11-21T02:51:54.005Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-21T02:51:54.005Z',
                    name: 'String',
                    slug: 'String8748665',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String3240657',
                        updatedAt: '2022-11-21T02:51:54.005Z',
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
            updatedAt: '2022-11-21T02:51:54.005Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-21T02:51:54.005Z',
                    name: 'String',
                    slug: 'String1744156',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String8466597',
                        updatedAt: '2022-11-21T02:51:54.005Z',
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
