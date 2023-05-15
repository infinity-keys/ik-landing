import type { Bundle } from '@prisma/client'

import {
  bundles,
  bundle,
  createBundle,
  updateBundle,
  deleteBundle,
} from './bundles'
import type { StandardScenario } from './bundles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe.skip('bundles', () => {
  scenario('returns all bundles', async (scenario: StandardScenario) => {
    const result = await bundles()

    expect(result.length).toEqual(Object.keys(scenario.bundle).length)
  })

  scenario('returns a single bundle', async (scenario: StandardScenario) => {
    const result = await bundle({ id: scenario.bundle.one.id })

    expect(result).toEqual(scenario.bundle.one)
  })

  scenario('creates a bundle', async (scenario: StandardScenario) => {
    const result = await createBundle({
      input: { rewardableId: scenario.bundle.two.rewardableId },
    })

    expect(result.rewardableId).toEqual(scenario.bundle.two.rewardableId)
  })

  scenario('updates a bundle', async (scenario: StandardScenario) => {
    const original = (await bundle({ id: scenario.bundle.one.id })) as Bundle
    const result = await updateBundle({
      id: original.id,
      input: { rewardableId: scenario.bundle.two.rewardableId },
    })

    expect(result.rewardableId).toEqual(scenario.bundle.two.rewardableId)
  })

  scenario('deletes a bundle', async (scenario: StandardScenario) => {
    const original = (await deleteBundle({
      id: scenario.bundle.one.id,
    })) as Bundle
    const result = await bundle({ id: original.id })

    expect(result).toEqual(null)
  })
})
