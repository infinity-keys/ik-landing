import { createContractNft } from './create-contract-nft'

describe.skip('create contract', () => {
  it('returns a token id', async () => {
    const result = await createContractNft()
    expect(result).toHaveProperty('tokenId')
    expect(typeof result?.tokenId).toBe('number')
  })
})
