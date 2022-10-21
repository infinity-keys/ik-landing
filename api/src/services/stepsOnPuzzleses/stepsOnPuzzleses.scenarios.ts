import type { Prisma, StepsOnPuzzles } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StepsOnPuzzlesCreateArgs>({
  stepsOnPuzzles: {
    one: {
      data: {
        stepSortWeight: 5194978,
        step: { create: { solution: 'String' } },
        puzzle: {
          create: { puzzleName: 'String', path: 'String', rewardNft: 'String' },
        },
      },
    },
    two: {
      data: {
        stepSortWeight: 7614403,
        step: { create: { solution: 'String' } },
        puzzle: {
          create: { puzzleName: 'String', path: 'String', rewardNft: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<StepsOnPuzzles, 'stepsOnPuzzles'>
