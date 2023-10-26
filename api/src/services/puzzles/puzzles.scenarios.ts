import type { Prisma, Puzzle } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: {
        requirements: 'HOLDERS',
        coverImage: 'String',
        rewardable: {
          create: {
            updatedAt: '2023-07-20T17:26:47.318Z',
            name: 'String',
            slug: 'String',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String5132955',
                updatedAt: '2023-07-20T17:26:47.318Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        requirements: 'HOLDERS',
        coverImage: 'String',
        rewardable: {
          create: {
            updatedAt: '2023-07-20T17:26:47.318Z',
            name: 'String',
            slug: 'String',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String5891550',
                updatedAt: '2023-07-20T17:26:47.318Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
