import type { StepFunctionCall } from '@prisma/client'

import {
  stepFunctionCalls,
  stepFunctionCall,
  createStepFunctionCall,
  updateStepFunctionCall,
  deleteStepFunctionCall,
} from './stepFunctionCalls'
import type { StandardScenario } from './stepFunctionCalls.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('stepFunctionCalls', () => {
  scenario(
    'returns all stepFunctionCalls',
    async (scenario: StandardScenario) => {
      const result = await stepFunctionCalls()

      expect(result.length).toEqual(
        Object.keys(scenario.stepFunctionCall).length
      )
    }
  )

  scenario(
    'returns a single stepFunctionCall',
    async (scenario: StandardScenario) => {
      const result = await stepFunctionCall({
        id: scenario.stepFunctionCall.one.id,
      })

      expect(result).toEqual(scenario.stepFunctionCall.one)
    }
  )

  scenario('creates a stepFunctionCall', async (scenario: StandardScenario) => {
    const result = await createStepFunctionCall({
      input: {
        stepId: scenario.stepFunctionCall.two.stepId,
        methodIds: 'String',
      },
    })

    expect(result.stepId).toEqual(scenario.stepFunctionCall.two.stepId)
    expect(result.methodIds).toEqual('String')
  })

  scenario('updates a stepFunctionCall', async (scenario: StandardScenario) => {
    const original = (await stepFunctionCall({
      id: scenario.stepFunctionCall.one.id,
    })) as StepFunctionCall
    const result = await updateStepFunctionCall({
      id: original.id,
      input: { methodIds: 'String2' },
    })

    expect(result.methodIds).toEqual('String2')
  })

  scenario('deletes a stepFunctionCall', async (scenario: StandardScenario) => {
    const original = (await deleteStepFunctionCall({
      id: scenario.stepFunctionCall.one.id,
    })) as StepFunctionCall
    const result = await stepFunctionCall({ id: original.id })

    expect(result).toEqual(null)
  })
})
