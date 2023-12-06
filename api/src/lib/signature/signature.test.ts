import { generateSignature } from './signature'

const TEST_ACCOUNT = '0xD0800f5851cAF82480266DE07af59Fa85B9eC893'

describe('signature', () => {
  it('creates a signature', async () => {
    const sig = await generateSignature(TEST_ACCOUNT, 1)
    expect(sig.ok).toBe(true)
    expect(typeof sig.val).toBe('string')
  })

  it('errors with invalid address', async () => {
    const sig = await generateSignature('not an address', 1)
    expect(sig.ok).toBe(false)
    expect(sig.val).toBe('There was a problem obtaining signature.')
  })
})
