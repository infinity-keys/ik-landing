import type { Prisma, Puzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: {
        rewardable: {
          create: {
            updatedAt: '2022-11-21T02:50:31.492Z',
            name: 'String',
            slug: 'String1780290',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String2185638',
                updatedAt: '2022-11-21T02:50:31.492Z',
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
            updatedAt: '2022-11-21T02:50:31.492Z',
            name: 'String',
            slug: 'String1605209',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String8824991',
                updatedAt: '2022-11-21T02:50:31.492Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
