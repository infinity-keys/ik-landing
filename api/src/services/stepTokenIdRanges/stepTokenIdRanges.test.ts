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

describe('stepTokenIdRanges', () => {
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
        startId: 1983898,
        endId: 7660692,
        startIds: 3579568,
        endIds: 3748002,
      },
    })

    expect(result.stepId).toEqual(scenario.stepTokenIdRange.two.stepId)
    expect(result.contractAddress).toEqual('String')
    expect(result.chainId).toEqual('String')
    expect(result.startId).toEqual(1983898)
    expect(result.endId).toEqual(7660692)
    expect(result.startIds).toEqual(3579568)
    expect(result.endIds).toEqual(3748002)
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
