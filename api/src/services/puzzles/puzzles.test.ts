import type { Puzzle } from '@prisma/client'

import {
  puzzles,
  puzzle,
  createPuzzle,
  updatePuzzle,
  deletePuzzle,
} from './puzzles'
import type { StandardScenario } from './puzzles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('puzzles', () => {
  scenario('returns all puzzles', async (scenario: StandardScenario) => {
    const result = await puzzles()

    expect(result.length).toEqual(Object.keys(scenario.puzzle).length)
  })

  scenario('returns a single puzzle', async (scenario: StandardScenario) => {
    const result = await puzzle({ id: scenario.puzzle.one.id })

    expect(result).toEqual(scenario.puzzle.one)
  })

  scenario('creates a puzzle', async () => {
    const result = await createPuzzle({
      input: {
        updatedAt: '2022-10-24T17:00:26Z',
        puzzleName: 'String',
        path: 'String',
      },
    })

    expect(result.updatedAt).toEqual('2022-10-24T17:00:26Z')
    expect(result.puzzleName).toEqual('String')
    expect(result.path).toEqual('String')
  })

  scenario('updates a puzzle', async (scenario: StandardScenario) => {
    const original = (await puzzle({ id: scenario.puzzle.one.id })) as Puzzle
    const result = await updatePuzzle({
      id: original.id,
      input: { updatedAt: '2022-10-25T17:00:26Z' },
    })

    expect(result.updatedAt).toEqual('2022-10-25T17:00:26Z')
  })

  scenario('deletes a puzzle', async (scenario: StandardScenario) => {
    const original = (await deletePuzzle({
      id: scenario.puzzle.one.id,
    })) as Puzzle
    const result = await puzzle({ id: original.id })

    expect(result).toEqual(null)
  })
})
