import type { Prisma, Puzzle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzleCreateArgs>({
  puzzle: {
    one: { data: { puzzleName: 'String', path: 'String' } },
    two: { data: { puzzleName: 'String', path: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Puzzle, 'puzzle'>
