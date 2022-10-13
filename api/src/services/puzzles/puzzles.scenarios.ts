import type { Prisma, Puzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: {
      data: { path: 'String', rewardNft: 'String', listSortWeight: 6582573 },
    },
    two: {
      data: { path: 'String', rewardNft: 'String', listSortWeight: 37005 },
    },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
