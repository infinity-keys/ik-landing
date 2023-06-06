import type { StepErc20Balance } from '@prisma/client'

import {
  stepErc20Balances,
  stepErc20Balance,
  createStepErc20Balance,
  updateStepErc20Balance,
  deleteStepErc20Balance,
} from './stepErc20Balances'
import type { StandardScenario } from './stepErc20Balances.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('stepErc20Balances', () => {
  scenario(
    'returns all stepErc20Balances',
    async (scenario: StandardScenario) => {
      const result = await stepErc20Balances()

      expect(result.length).toEqual(
        Object.keys(scenario.stepErc20Balance).length
      )
    }
  )

  scenario(
    'returns a single stepErc20Balance',
    async (scenario: StandardScenario) => {
      const result = await stepErc20Balance({
        id: scenario.stepErc20Balance.one.id,
      })

      expect(result).toEqual(scenario.stepErc20Balance.one)
    }
  )

  scenario('creates a stepErc20Balance', async (scenario: StandardScenario) => {
    const result = await createStepErc20Balance({
      input: {
        stepId: scenario.stepErc20Balance.two.stepId,
        contractAddress: 'String',
        chainId: 'String',
        minBalance: 'String',
      },
    })

    expect(result.stepId).toEqual(scenario.stepErc20Balance.two.stepId)
    expect(result.contractAddress).toEqual('String')
    expect(result.chainId).toEqual('String')
    expect(result.minBalance).toEqual('String')
  })

  scenario('updates a stepErc20Balance', async (scenario: StandardScenario) => {
    const original = (await stepErc20Balance({
      id: scenario.stepErc20Balance.one.id,
    })) as StepErc20Balance
    const result = await updateStepErc20Balance({
      id: original.id,
      input: { contractAddress: 'String2' },
    })

    expect(result.contractAddress).toEqual('String2')
  })

  scenario('deletes a stepErc20Balance', async (scenario: StandardScenario) => {
    const original = (await deleteStepErc20Balance({
      id: scenario.stepErc20Balance.one.id,
    })) as StepErc20Balance
    const result = await stepErc20Balance({ id: original.id })

    expect(result).toEqual(null)
  })
})
