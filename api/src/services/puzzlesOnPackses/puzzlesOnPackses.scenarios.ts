import type { Prisma, PuzzlesOnPacks } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PuzzlesOnPacksCreateArgs>({
  puzzlesOnPacks: {
    one: {
      data: {
        puzzleSortWeight: 4549951,
        updatedAt: '2022-10-24T16:59:25Z',
        puzzle: {
          create: {
            updatedAt: '2022-10-24T16:59:25Z',
            puzzleName: 'String',
            path: 'String',
          },
        },
        pack: {
          create: {
            updatedAt: '2022-10-24T16:59:25Z',
            name: 'String',
            path: 'String',
          },
        },
      },
    },
    two: {
      data: {
        puzzleSortWeight: 6443333,
        updatedAt: '2022-10-24T16:59:25Z',
        puzzle: {
          create: {
            updatedAt: '2022-10-24T16:59:25Z',
            puzzleName: 'String',
            path: 'String',
          },
        },
        pack: {
          create: {
            updatedAt: '2022-10-24T16:59:25Z',
            name: 'String',
            path: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<PuzzlesOnPacks, 'puzzlesOnPacks'>
