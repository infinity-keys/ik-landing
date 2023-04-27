import type { Prisma, StepSimpleText } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepSimpleTextCreateArgs>({
  stepSimpleText: {
    one: {
      data: {
        solution: 'String',
        solutionCharCount: 7228485,
        step: {
          create: {
            updatedAt: '2022-11-22T06:15:08.917Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-22T06:15:08.918Z',
                    name: 'String',
                    slug: 'String6063705',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String8816816',
                        updatedAt: '2022-11-22T06:15:08.918Z',
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
        solutionCharCount: 8981945,
        step: {
          create: {
            updatedAt: '2022-11-22T06:15:08.918Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-22T06:15:08.918Z',
                    name: 'String',
                    slug: 'String3437835',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String4823532',
                        updatedAt: '2022-11-22T06:15:08.918Z',
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
