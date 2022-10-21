import type { PuzzlesOnPacks } from '@prisma/client'

import {
  puzzlesOnPackses,
  puzzlesOnPacks,
  createPuzzlesOnPacks,
  updatePuzzlesOnPacks,
  deletePuzzlesOnPacks,
} from './puzzlesOnPackses'
import type { StandardScenario } from './puzzlesOnPackses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('puzzlesOnPackses', () => {
  scenario(
    'returns all puzzlesOnPackses',
    async (scenario: StandardScenario) => {
      const result = await puzzlesOnPackses()

      expect(result.length).toEqual(Object.keys(scenario.puzzlesOnPacks).length)
    }
  )

  scenario(
    'returns a single puzzlesOnPacks',
    async (scenario: StandardScenario) => {
      const result = await puzzlesOnPacks({
        id: scenario.puzzlesOnPacks.one.id,
      })

      expect(result).toEqual(scenario.puzzlesOnPacks.one)
    }
  )

  scenario('creates a puzzlesOnPacks', async (scenario: StandardScenario) => {
    const result = await createPuzzlesOnPacks({
      input: {
        puzzleId: scenario.puzzlesOnPacks.two.puzzleId,
        packId: scenario.puzzlesOnPacks.two.packId,
        puzzleSortWeight: 2987692,
      },
    })

    expect(result.puzzleId).toEqual(scenario.puzzlesOnPacks.two.puzzleId)
    expect(result.packId).toEqual(scenario.puzzlesOnPacks.two.packId)
    expect(result.puzzleSortWeight).toEqual(2987692)
  })

  scenario('updates a puzzlesOnPacks', async (scenario: StandardScenario) => {
    const original = (await puzzlesOnPacks({
      id: scenario.puzzlesOnPacks.one.id,
    })) as PuzzlesOnPacks
    const result = await updatePuzzlesOnPacks({
      id: original.id,
      input: { puzzleSortWeight: 7737092 },
    })

    expect(result.puzzleSortWeight).toEqual(7737092)
  })

  scenario('deletes a puzzlesOnPacks', async (scenario: StandardScenario) => {
    const original = (await deletePuzzlesOnPacks({
      id: scenario.puzzlesOnPacks.one.id,
    })) as PuzzlesOnPacks
    const result = await puzzlesOnPacks({ id: original.id })

    expect(result).toEqual(null)
  })
})
