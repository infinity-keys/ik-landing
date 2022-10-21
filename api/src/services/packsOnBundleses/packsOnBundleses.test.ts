import type { PacksOnBundles } from '@prisma/client'

import {
  packsOnBundleses,
  packsOnBundles,
  createPacksOnBundles,
  updatePacksOnBundles,
  deletePacksOnBundles,
} from './packsOnBundleses'
import type { StandardScenario } from './packsOnBundleses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('packsOnBundleses', () => {
  scenario(
    'returns all packsOnBundleses',
    async (scenario: StandardScenario) => {
      const result = await packsOnBundleses()

      expect(result.length).toEqual(Object.keys(scenario.packsOnBundles).length)
    }
  )

  scenario(
    'returns a single packsOnBundles',
    async (scenario: StandardScenario) => {
      const result = await packsOnBundles({
        id: scenario.packsOnBundles.one.id,
      })

      expect(result).toEqual(scenario.packsOnBundles.one)
    }
  )

  scenario('creates a packsOnBundles', async (scenario: StandardScenario) => {
    const result = await createPacksOnBundles({
      input: {
        packId: scenario.packsOnBundles.two.packId,
        bundleId: scenario.packsOnBundles.two.bundleId,
        packSortWeight: 5198801,
      },
    })

    expect(result.packId).toEqual(scenario.packsOnBundles.two.packId)
    expect(result.bundleId).toEqual(scenario.packsOnBundles.two.bundleId)
    expect(result.packSortWeight).toEqual(5198801)
  })

  scenario('updates a packsOnBundles', async (scenario: StandardScenario) => {
    const original = (await packsOnBundles({
      id: scenario.packsOnBundles.one.id,
    })) as PacksOnBundles
    const result = await updatePacksOnBundles({
      id: original.id,
      input: { packSortWeight: 343859 },
    })

    expect(result.packSortWeight).toEqual(343859)
  })

  scenario('deletes a packsOnBundles', async (scenario: StandardScenario) => {
    const original = (await deletePacksOnBundles({
      id: scenario.packsOnBundles.one.id,
    })) as PacksOnBundles
    const result = await packsOnBundles({ id: original.id })

    expect(result).toEqual(null)
  })
})
