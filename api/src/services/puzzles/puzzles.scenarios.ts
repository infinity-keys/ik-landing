import type { Prisma, Puzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: {
        rewardable: {
          create: {
            updatedAt: '2022-11-24T06:51:23.982Z',
            name: 'String',
            slug: 'String8013137',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String3270675',
                updatedAt: '2022-11-24T06:51:23.982Z',
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
            updatedAt: '2022-11-24T06:51:23.982Z',
            name: 'String',
            slug: 'String7943071',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String2737822',
                updatedAt: '2022-11-24T06:51:23.982Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
