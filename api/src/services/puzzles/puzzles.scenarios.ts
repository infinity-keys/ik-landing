import type { Prisma, Puzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: {
        updatedAt: '2022-10-24T17:00:26Z',
        puzzleName: 'String',
        path: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2022-10-24T17:00:26Z',
        puzzleName: 'String',
        path: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
