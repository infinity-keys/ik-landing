import type { StepNftCheck } from '@prisma/client'

import {
  stepNftChecks,
  stepNftCheck,
  createStepNftCheck,
  updateStepNftCheck,
  deleteStepNftCheck,
} from './stepNftChecks'
import type { StandardScenario } from './stepNftChecks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('stepNftChecks', () => {
  scenario('returns all stepNftChecks', async (scenario: StandardScenario) => {
    const result = await stepNftChecks()

    expect(result.length).toEqual(Object.keys(scenario.stepNftCheck).length)
  })

  scenario(
    'returns a single stepNftCheck',
    async (scenario: StandardScenario) => {
      const result = await stepNftCheck({ id: scenario.stepNftCheck.one.id })

      expect(result).toEqual(scenario.stepNftCheck.one)
    }
  )

  scenario('creates a stepNftCheck', async (scenario: StandardScenario) => {
    const result = await createStepNftCheck({
      input: { stepId: scenario.stepNftCheck.two.stepId },
    })

    expect(result.stepId).toEqual(scenario.stepNftCheck.two.stepId)
  })

  scenario('updates a stepNftCheck', async (scenario: StandardScenario) => {
    const original = (await stepNftCheck({
      id: scenario.stepNftCheck.one.id,
    })) as StepNftCheck
    const result = await updateStepNftCheck({
      id: original.id,
      input: { stepId: scenario.stepNftCheck.two.stepId },
    })

    expect(result.stepId).toEqual(scenario.stepNftCheck.two.stepId)
  })

  scenario('deletes a stepNftCheck', async (scenario: StandardScenario) => {
    const original = (await deleteStepNftCheck({
      id: scenario.stepNftCheck.one.id,
    })) as StepNftCheck
    const result = await stepNftCheck({ id: original.id })

    expect(result).toEqual(null)
  })
})
