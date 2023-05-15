import type { Prisma, Puzzle } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: {
        rewardable: {
          create: {
            updatedAt: '2023-02-17T21:34:23.220Z',
            name: 'String',
            slug: 'String',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String2591777',
                updatedAt: '2023-02-17T21:34:23.220Z',
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
            updatedAt: '2023-02-17T21:34:23.220Z',
            name: 'String',
            slug: 'String',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String9063469',
                updatedAt: '2023-02-17T21:34:23.220Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
