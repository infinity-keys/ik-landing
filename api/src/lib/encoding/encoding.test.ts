import { compressAndEncryptText, decryptAndDecompressText } from './encoding'

describe.skip('encoding lib', () => {
  it('compresses and encrypts simple strings, decrypts and decompresses correctly', () => {
    const message = 'kittens'

    const compressedCyphertext = compressAndEncryptText(message)
    const plainText = decryptAndDecompressText(compressedCyphertext)

    expect(plainText).toEqual(message)
  })
  it('compresses and encrypts json strings, decrypts and decompresses correctly', () => {
    const json = JSON.stringify({ kittens: 'meow' })

    const compressedCyphertext = compressAndEncryptText(json)
    const plainText = decryptAndDecompressText(compressedCyphertext)

    expect(plainText).toEqual(json)
  })
})
