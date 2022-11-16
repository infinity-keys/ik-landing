import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        updatedAt: '2022-11-15T05:47:44.206Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2022-11-15T05:47:44.206Z',
                name: 'String',
                slug: 'String9031452',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String8481313',
                    updatedAt: '2022-11-15T05:47:44.206Z',
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
        updatedAt: '2022-11-15T05:47:44.206Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2022-11-15T05:47:44.206Z',
                name: 'String',
                slug: 'String1331603',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String6772414',
                    updatedAt: '2022-11-15T05:47:44.206Z',
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
