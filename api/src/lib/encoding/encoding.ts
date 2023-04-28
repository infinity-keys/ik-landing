import aes from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'
import { compress, decompress } from 'qfs-compression'

const { INFINITY_KEYS_SECRET } = process.env

// @TODO: can buffer from one function feed to the other
export const compressAndEncryptText = (plaintext: string) => {
  // Compress
  const compressedText = compress(Buffer.from(plaintext)).toString('base64')
  // Encrypt
  if (!INFINITY_KEYS_SECRET) {
    throw new Error('INFINITY_KEYS_SECRET is not set')
  }
  const cyphertext = aes
    .encrypt(compressedText, INFINITY_KEYS_SECRET)
    .toString()

  return cyphertext
}

// @TODO: can buffer from one function feed to the other
export const decryptAndDecompressText = (cyphertext: string) => {
  // Decrypt
  const compressedText = aes
    .decrypt(cyphertext, INFINITY_KEYS_SECRET)
    .toString(encUtf8)
  // Decompress
  const plaintext = decompress(Buffer.from(compressedText, 'base64')).toString()

  return plaintext
}

export const decryptCookie = (data: string | undefined) => {
  return data && JSON.parse(decryptAndDecompressText(data))
}
