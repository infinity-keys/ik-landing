import type { Prisma, Puzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: {
        rewardable: {
          create: {
            updatedAt: '2022-11-17T01:24:52.809Z',
            name: 'String',
            slug: 'String3779966',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String3124707',
                updatedAt: '2022-11-17T01:24:52.809Z',
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
            updatedAt: '2022-11-17T01:24:52.809Z',
            name: 'String',
            slug: 'String2267537',
            explanation: 'String',
            type: 'PUZZLE',
            organization: {
              create: {
                name: 'String',
                slug: 'String2854625',
                updatedAt: '2022-11-17T01:24:52.809Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
