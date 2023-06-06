import type { StepLensApi } from '@prisma/client'

import {
  stepLensApis,
  stepLensApi,
  createStepLensApi,
  updateStepLensApi,
  deleteStepLensApi,
} from './stepLensApis'
import type { StandardScenario } from './stepLensApis.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('stepLensApis', () => {
  scenario('returns all stepLensApis', async (scenario: StandardScenario) => {
    const result = await stepLensApis()

    expect(result.length).toEqual(Object.keys(scenario.stepLensApi).length)
  })

  scenario(
    'returns a single stepLensApi',
    async (scenario: StandardScenario) => {
      const result = await stepLensApi({ id: scenario.stepLensApi.one.id })

      expect(result).toEqual(scenario.stepLensApi.one)
    }
  )

  scenario('creates a stepLensApi', async (scenario: StandardScenario) => {
    const result = await createStepLensApi({
      input: {
        stepId: scenario.stepLensApi.two.stepId,
        checkType: 'HAS_COMPLETED_PROFILE',
        followedUserIds: 'String',
      },
    })

    expect(result.stepId).toEqual(scenario.stepLensApi.two.stepId)
    expect(result.checkType).toEqual('HAS_COMPLETED_PROFILE')
    expect(result.followedUserIds).toEqual('String')
  })

  scenario('updates a stepLensApi', async (scenario: StandardScenario) => {
    const original = (await stepLensApi({
      id: scenario.stepLensApi.one.id,
    })) as StepLensApi
    const result = await updateStepLensApi({
      id: original.id,
      input: { checkType: 'IS_FOLLOWING_USER' },
    })

    expect(result.checkType).toEqual('IS_FOLLOWING_USER')
  })

  scenario('deletes a stepLensApi', async (scenario: StandardScenario) => {
    const original = (await deleteStepLensApi({
      id: scenario.stepLensApi.one.id,
    })) as StepLensApi
    const result = await stepLensApi({ id: original.id })

    expect(result).toEqual(null)
  })
})
