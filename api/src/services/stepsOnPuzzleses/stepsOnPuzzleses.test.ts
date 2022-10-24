import type { StepsOnPuzzles } from '@prisma/client'

import {
  stepsOnPuzzleses,
  stepsOnPuzzles,
  createStepsOnPuzzles,
  updateStepsOnPuzzles,
  deleteStepsOnPuzzles,
} from './stepsOnPuzzleses'
import type { StandardScenario } from './stepsOnPuzzleses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('stepsOnPuzzleses', () => {
  scenario(
    'returns all stepsOnPuzzleses',
    async (scenario: StandardScenario) => {
      const result = await stepsOnPuzzleses()

      expect(result.length).toEqual(Object.keys(scenario.stepsOnPuzzles).length)
    }
  )

  scenario(
    'returns a single stepsOnPuzzles',
    async (scenario: StandardScenario) => {
      const result = await stepsOnPuzzles({
        id: scenario.stepsOnPuzzles.one.id,
      })

      expect(result).toEqual(scenario.stepsOnPuzzles.one)
    }
  )

  scenario('creates a stepsOnPuzzles', async (scenario: StandardScenario) => {
    const result = await createStepsOnPuzzles({
      input: {
        stepId: scenario.stepsOnPuzzles.two.stepId,
        puzzleId: scenario.stepsOnPuzzles.two.puzzleId,
        updatedAt: '2022-10-24T17:00:06Z',
      },
    })

    expect(result.stepId).toEqual(scenario.stepsOnPuzzles.two.stepId)
    expect(result.puzzleId).toEqual(scenario.stepsOnPuzzles.two.puzzleId)
    expect(result.updatedAt).toEqual('2022-10-24T17:00:06Z')
  })

  scenario('updates a stepsOnPuzzles', async (scenario: StandardScenario) => {
    const original = (await stepsOnPuzzles({
      id: scenario.stepsOnPuzzles.one.id,
    })) as StepsOnPuzzles
    const result = await updateStepsOnPuzzles({
      id: original.id,
      input: { updatedAt: '2022-10-25T17:00:06Z' },
    })

    expect(result.updatedAt).toEqual('2022-10-25T17:00:06Z')
  })

  scenario('deletes a stepsOnPuzzles', async (scenario: StandardScenario) => {
    const original = (await deleteStepsOnPuzzles({
      id: scenario.stepsOnPuzzles.one.id,
    })) as StepsOnPuzzles
    const result = await stepsOnPuzzles({ id: original.id })

    expect(result).toEqual(null)
  })
})
