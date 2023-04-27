import type { StepComethApi } from '@prisma/client'

import {
  stepComethApis,
  stepComethApi,
  createStepComethApi,
  updateStepComethApi,
  deleteStepComethApi,
} from './stepComethApis'
import type { StandardScenario } from './stepComethApis.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('stepComethApis', () => {
  scenario('returns all stepComethApis', async (scenario: StandardScenario) => {
    const result = await stepComethApis()

    expect(result.length).toEqual(Object.keys(scenario.stepComethApi).length)
  })

  scenario(
    'returns a single stepComethApi',
    async (scenario: StandardScenario) => {
      const result = await stepComethApi({ id: scenario.stepComethApi.one.id })

      expect(result).toEqual(scenario.stepComethApi.one)
    }
  )

  scenario('creates a stepComethApi', async (scenario: StandardScenario) => {
    const result = await createStepComethApi({
      input: { stepId: scenario.stepComethApi.two.stepId },
    })

    expect(result.stepId).toEqual(scenario.stepComethApi.two.stepId)
  })

  scenario('updates a stepComethApi', async (scenario: StandardScenario) => {
    const original = (await stepComethApi({
      id: scenario.stepComethApi.one.id,
    })) as StepComethApi
    const result = await updateStepComethApi({
      id: original.id,
      input: { stepId: scenario.stepComethApi.two.stepId },
    })

    expect(result.stepId).toEqual(scenario.stepComethApi.two.stepId)
  })

  scenario('deletes a stepComethApi', async (scenario: StandardScenario) => {
    const original = (await deleteStepComethApi({
      id: scenario.stepComethApi.one.id,
    })) as StepComethApi
    const result = await stepComethApi({ id: original.id })

    expect(result).toEqual(null)
  })
})
