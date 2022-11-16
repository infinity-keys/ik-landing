import type { Prisma, StepSimpleText } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepSimpleTextCreateArgs>({
  stepSimpleText: {
    one: {
      data: {
        solution: 'String',
        step: {
          create: {
            updatedAt: '2022-11-15T05:35:02.687Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-15T05:35:02.687Z',
                    name: 'String',
                    slug: 'String8692029',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String7613158',
                        updatedAt: '2022-11-15T05:35:02.687Z',
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
            updatedAt: '2022-11-15T05:35:02.687Z',
            puzzle: {
              create: {
                rewardable: {
                  create: {
                    updatedAt: '2022-11-15T05:35:02.687Z',
                    name: 'String',
                    slug: 'String8256800',
                    explanation: 'String',
                    type: 'PUZZLE',
                    organization: {
                      create: {
                        name: 'String',
                        slug: 'String6094468',
                        updatedAt: '2022-11-15T05:35:02.687Z',
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
