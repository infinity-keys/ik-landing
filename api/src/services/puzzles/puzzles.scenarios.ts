import type { Prisma, Puzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: {
        rewardable: {
          create: {
            updatedAt: '2022-11-18T07:06:32.911Z',
            name: 'String',
            slug: 'String6763863',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String8996766',
                updatedAt: '2022-11-18T07:06:32.911Z',
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
            updatedAt: '2022-11-18T07:06:32.911Z',
            name: 'String',
            slug: 'String1019818',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String4915588',
                updatedAt: '2022-11-18T07:06:32.912Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
