import type { NftCheckDatum } from '@prisma/client'

import {
  nftCheckData,
  nftCheckDatum,
  deleteNftCheckDatum,
} from './nftCheckData'
import type { StandardScenario } from './nftCheckData.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('nftCheckData', () => {
  scenario('returns all nftCheckData', async (scenario: StandardScenario) => {
    const result = await nftCheckData()

    expect(result.length).toEqual(Object.keys(scenario.nftCheckDatum).length)
  })

  scenario(
    'returns a single nftCheckDatum',
    async (scenario: StandardScenario) => {
      const result = await nftCheckDatum({ id: scenario.nftCheckDatum.one.id })

      expect(result).toEqual(scenario.nftCheckDatum.one)
    }
  )

  scenario('deletes a nftCheckDatum', async (scenario: StandardScenario) => {
    const original = (await deleteNftCheckDatum({
      id: scenario.nftCheckDatum.one.id,
    })) as NftCheckDatum
    const result = await nftCheckDatum({ id: original.id })

    expect(result).toEqual(null)
  })
})
