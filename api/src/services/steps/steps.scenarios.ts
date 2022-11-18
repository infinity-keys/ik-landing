import type { Prisma, Step } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepCreateArgs>({
  step: {
    one: {
      data: {
        updatedAt: '2022-11-18T07:06:47.507Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2022-11-18T07:06:47.507Z',
                name: 'String',
                slug: 'String9858791',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String548746',
                    updatedAt: '2022-11-18T07:06:47.507Z',
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
        updatedAt: '2022-11-18T07:06:47.507Z',
        puzzle: {
          create: {
            rewardable: {
              create: {
                updatedAt: '2022-11-18T07:06:47.507Z',
                name: 'String',
                slug: 'String8007714',
                explanation: 'String',
                type: 'PUZZLE',
                organization: {
                  create: {
                    name: 'String',
                    slug: 'String9197201',
                    updatedAt: '2022-11-18T07:06:47.507Z',
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
