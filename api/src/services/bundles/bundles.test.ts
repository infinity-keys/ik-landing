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
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bundles', () => {
  scenario('returns all bundles', async (scenario: StandardScenario) => {
    const result = await bundles()

    expect(result.length).toEqual(Object.keys(scenario.bundle).length)
  })

  scenario('returns a single bundle', async (scenario: StandardScenario) => {
    const result = await bundle({ id: scenario.bundle.one.id })

    expect(result).toEqual(scenario.bundle.one)
  })

  scenario('creates a bundle', async () => {
    const result = await createBundle({
      input: { name: 'String', path: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.path).toEqual('String')
  })

  scenario('updates a bundle', async (scenario: StandardScenario) => {
    const original = (await bundle({ id: scenario.bundle.one.id })) as Bundle
    const result = await updateBundle({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a bundle', async (scenario: StandardScenario) => {
    const original = (await deleteBundle({
      id: scenario.bundle.one.id,
    })) as Bundle
    const result = await bundle({ id: original.id })

    expect(result).toEqual(null)
  })
})
