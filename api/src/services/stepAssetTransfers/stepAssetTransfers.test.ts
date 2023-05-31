import type { StepAssetTransfer } from '@prisma/client'

import {
  stepAssetTransfers,
  stepAssetTransfer,
  createStepAssetTransfer,
  updateStepAssetTransfer,
  deleteStepAssetTransfer,
} from './stepAssetTransfers'
import type { StandardScenario } from './stepAssetTransfers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('stepAssetTransfers', () => {
  scenario(
    'returns all stepAssetTransfers',
    async (scenario: StandardScenario) => {
      const result = await stepAssetTransfers()

      expect(result.length).toEqual(
        Object.keys(scenario.stepAssetTransfer).length
      )
    }
  )

  scenario(
    'returns a single stepAssetTransfer',
    async (scenario: StandardScenario) => {
      const result = await stepAssetTransfer({
        id: scenario.stepAssetTransfer.one.id,
      })

      expect(result).toEqual(scenario.stepAssetTransfer.one)
    }
  )

  scenario(
    'creates a stepAssetTransfer',
    async (scenario: StandardScenario) => {
      const result = await createStepAssetTransfer({
        input: {
          stepId: scenario.stepAssetTransfer.two.stepId,
          toAddress: 'String',
        },
      })

      expect(result.stepId).toEqual(scenario.stepAssetTransfer.two.stepId)
      expect(result.toAddress).toEqual('String')
    }
  )

  scenario(
    'updates a stepAssetTransfer',
    async (scenario: StandardScenario) => {
      const original = (await stepAssetTransfer({
        id: scenario.stepAssetTransfer.one.id,
      })) as StepAssetTransfer
      const result = await updateStepAssetTransfer({
        id: original.id,
        input: { toAddress: 'String2' },
      })

      expect(result.toAddress).toEqual('String2')
    }
  )

  scenario(
    'deletes a stepAssetTransfer',
    async (scenario: StandardScenario) => {
      const original = (await deleteStepAssetTransfer({
        id: scenario.stepAssetTransfer.one.id,
      })) as StepAssetTransfer
      const result = await stepAssetTransfer({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
