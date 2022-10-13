import type { Nft } from '@prisma/client'

import { nfts, nft, createNft, updateNft, deleteNft } from './nfts'
import type { StandardScenario } from './nfts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('nfts', () => {
  scenario('returns all nfts', async (scenario: StandardScenario) => {
    const result = await nfts()

    expect(result.length).toEqual(Object.keys(scenario.nft).length)
  })

  scenario('returns a single nft', async (scenario: StandardScenario) => {
    const result = await nft({ id: scenario.nft.one.id })

    expect(result).toEqual(scenario.nft.one)
  })

  scenario('creates a nft', async (scenario: StandardScenario) => {
    const result = await createNft({
      input: {
        tokenId: 6585345,
        contractName: 'String',
        data: { foo: 'bar' },
        cloudinaryId: 'String',
        puzzleId: scenario.nft.two.puzzleId,
      },
    })

    expect(result.tokenId).toEqual(6585345)
    expect(result.contractName).toEqual('String')
    expect(result.data).toEqual({ foo: 'bar' })
    expect(result.cloudinaryId).toEqual('String')
    expect(result.puzzleId).toEqual(scenario.nft.two.puzzleId)
  })

  scenario('updates a nft', async (scenario: StandardScenario) => {
    const original = (await nft({ id: scenario.nft.one.id })) as Nft
    const result = await updateNft({
      id: original.id,
      input: { tokenId: 8744882 },
    })

    expect(result.tokenId).toEqual(8744882)
  })

  scenario('deletes a nft', async (scenario: StandardScenario) => {
    const original = (await deleteNft({ id: scenario.nft.one.id })) as Nft
    const result = await nft({ id: original.id })

    expect(result).toEqual(null)
  })
})
