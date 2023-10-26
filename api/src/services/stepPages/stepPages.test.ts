import type { StepPage } from '@prisma/client'

import {
  stepPages,
  stepPage,
  createStepPage,
  updateStepPage,
  deleteStepPage,
} from './stepPages'
import type { StandardScenario } from './stepPages.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('stepPages', () => {
  scenario('returns all stepPages', async (scenario: StandardScenario) => {
    const result = await stepPages()

    expect(result.length).toEqual(Object.keys(scenario.stepPage).length)
  })

  scenario('returns a single stepPage', async (scenario: StandardScenario) => {
    const result = await stepPage({ id: scenario.stepPage.one.id })

    expect(result).toEqual(scenario.stepPage.one)
  })

  scenario('creates a stepPage', async (scenario: StandardScenario) => {
    const result = await createStepPage({
      input: {
        updatedAt: '2023-07-20T17:28:10.673Z',
        stepId: scenario.stepPage.two.stepId,
        body: 'String',
      },
    })

    expect(result.updatedAt).toEqual(new Date('2023-07-20T17:28:10.673Z'))
    expect(result.stepId).toEqual(scenario.stepPage.two.stepId)
    expect(result.body).toEqual('String')
  })

  scenario('updates a stepPage', async (scenario: StandardScenario) => {
    const original = (await stepPage({
      id: scenario.stepPage.one.id,
    })) as StepPage
    const result = await updateStepPage({
      id: original.id,
      input: { updatedAt: '2023-07-21T17:28:10.673Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2023-07-21T17:28:10.673Z'))
  })

  scenario('deletes a stepPage', async (scenario: StandardScenario) => {
    const original = (await deleteStepPage({
      id: scenario.stepPage.one.id,
    })) as StepPage
    const result = await stepPage({ id: original.id })

    expect(result).toEqual(null)
  })
})
