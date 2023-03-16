import type { Prisma, Pack } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PackCreateArgs>({
  pack: {
    one: {
      data: {
        rewardable: {
          create: {
            updatedAt: '2022-11-18T23:10:35.986Z',
            name: 'String',
            slug: 'String9156997',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String9652942',
                updatedAt: '2022-11-18T23:10:35.986Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        rewardable: {
          create: {
            updatedAt: '2022-11-18T23:10:35.986Z',
            name: 'String',
            slug: 'String6032478',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String4891878',
                updatedAt: '2022-11-18T23:10:35.986Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Pack, 'pack'>
