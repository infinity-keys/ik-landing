import type { StepOriumApi } from '@prisma/client'

import {
  stepOriumApis,
  stepOriumApi,
  createStepOriumApi,
  updateStepOriumApi,
  deleteStepOriumApi,
} from './stepOriumApis'
import type { StandardScenario } from './stepOriumApis.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('stepOriumApis', () => {
  scenario('returns all stepOriumApis', async (scenario: StandardScenario) => {
    const result = await stepOriumApis()

    expect(result.length).toEqual(Object.keys(scenario.stepOriumApi).length)
  })

  scenario(
    'returns a single stepOriumApi',
    async (scenario: StandardScenario) => {
      const result = await stepOriumApi({ id: scenario.stepOriumApi.one.id })

      expect(result).toEqual(scenario.stepOriumApi.one)
    }
  )

  scenario('creates a stepOriumApi', async (scenario: StandardScenario) => {
    const result = await createStepOriumApi({
      input: {
        stepId: scenario.stepOriumApi.two.stepId,
        checkType: 'HAS_CREATED_VAULT',
      },
    })

    expect(result.stepId).toEqual(scenario.stepOriumApi.two.stepId)
    expect(result.checkType).toEqual('HAS_CREATED_VAULT')
  })

  scenario('updates a stepOriumApi', async (scenario: StandardScenario) => {
    const original = (await stepOriumApi({
      id: scenario.stepOriumApi.one.id,
    })) as StepOriumApi
    const result = await updateStepOriumApi({
      id: original.id,
      input: { checkType: 'HAS_CREATED_SCHOLARSHIP' },
    })

    expect(result.checkType).toEqual('HAS_CREATED_SCHOLARSHIP')
  })

  scenario('deletes a stepOriumApi', async (scenario: StandardScenario) => {
    const original = (await deleteStepOriumApi({
      id: scenario.stepOriumApi.one.id,
    })) as StepOriumApi
    const result = await stepOriumApi({ id: original.id })

    expect(result).toEqual(null)
  })
})
