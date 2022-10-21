import type { Prisma, PuzzlesOnPacks } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzlesOnPacksCreateArgs>({
  puzzlesOnPacks: {
    one: {
      data: {
        puzzleSortWeight: 7754681,
        puzzle: {
          create: { puzzleName: 'String', path: 'String', rewardNft: 'String' },
        },
        pack: {
          create: { name: 'String', path: 'String', rewardNftId: 'String' },
        },
      },
    },
    two: {
      data: {
        puzzleSortWeight: 9004888,
        puzzle: {
          create: { puzzleName: 'String', path: 'String', rewardNft: 'String' },
        },
        pack: {
          create: { name: 'String', path: 'String', rewardNftId: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<PuzzlesOnPacks, 'puzzlesOnPacks'>
