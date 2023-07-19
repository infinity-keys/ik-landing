import type { Prisma, Puzzle } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: {
        requirements: 'HOLDERS',
        rewardable: {
          create: {
            updatedAt: '2023-07-19T16:32:18.815Z',
            name: 'String',
            slug: 'String',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String2828704',
                updatedAt: '2023-07-19T16:32:18.815Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        requirements: 'HOLDERS',
        rewardable: {
          create: {
            updatedAt: '2023-07-19T16:32:18.815Z',
            name: 'String',
            slug: 'String',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String8409011',
                updatedAt: '2023-07-19T16:32:18.815Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
