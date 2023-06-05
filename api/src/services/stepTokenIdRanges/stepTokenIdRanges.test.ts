import type { StepTokenIdRange } from '@prisma/client'

import {
  stepTokenIdRanges,
  stepTokenIdRange,
  createStepTokenIdRange,
  updateStepTokenIdRange,
  deleteStepTokenIdRange,
} from './stepTokenIdRanges'
import type { StandardScenario } from './stepTokenIdRanges.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('stepTokenIdRanges', () => {
  scenario(
    'returns all stepTokenIdRanges',
    async (scenario: StandardScenario) => {
      const result = await stepTokenIdRanges()

      expect(result.length).toEqual(
        Object.keys(scenario.stepTokenIdRange).length
      )
    }
  )

  scenario(
    'returns a single stepTokenIdRange',
    async (scenario: StandardScenario) => {
      const result = await stepTokenIdRange({
        id: scenario.stepTokenIdRange.one.id,
      })

      expect(result).toEqual(scenario.stepTokenIdRange.one)
    }
  )

  scenario('creates a stepTokenIdRange', async (scenario: StandardScenario) => {
    const result = await createStepTokenIdRange({
      input: {
        stepId: scenario.stepTokenIdRange.two.stepId,
        contractAddress: 'String',
        chainId: 'String',
        startIds: [1239768],
        endIds: [4087813],
      },
    })

    expect(result.stepId).toEqual(scenario.stepTokenIdRange.two.stepId)
    expect(result.contractAddress).toEqual('String')
    expect(result.chainId).toEqual('String')
    expect(result.startIds).toEqual(1239768)
    expect(result.endIds).toEqual(4087813)
  })

  scenario('updates a stepTokenIdRange', async (scenario: StandardScenario) => {
    const original = (await stepTokenIdRange({
      id: scenario.stepTokenIdRange.one.id,
    })) as StepTokenIdRange
    const result = await updateStepTokenIdRange({
      id: original.id,
      input: { contractAddress: 'String2' },
    })

    expect(result.contractAddress).toEqual('String2')
  })

  scenario('deletes a stepTokenIdRange', async (scenario: StandardScenario) => {
    const original = (await deleteStepTokenIdRange({
      id: scenario.stepTokenIdRange.one.id,
    })) as StepTokenIdRange
    const result = await stepTokenIdRange({ id: original.id })

    expect(result).toEqual(null)
  })
})
