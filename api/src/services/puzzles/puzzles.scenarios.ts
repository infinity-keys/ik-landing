import type { Prisma, Puzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: {
        puzzleName: 'String',
        path: 'String',
        rewardNft: 'String',
        listSortWeight: 5044985,
      },
    },
    two: {
      data: {
        puzzleName: 'String',
        path: 'String',
        rewardNft: 'String',
        listSortWeight: 8985410,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
