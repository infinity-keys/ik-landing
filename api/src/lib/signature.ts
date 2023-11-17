import { CONTRACT_ADDRESS_OPTIMISM } from '@infinity-keys/constants'
import { ethers } from 'ethers'

import { logger } from './logger'

const { PRIVATE_KEY_VERIFY, MINT_SECRET_VERIFY } = process.env

if (!PRIVATE_KEY_VERIFY || !MINT_SECRET_VERIFY) {
  throw new Error('Missing wallet secrets')
}

const wallet = new ethers.Wallet(PRIVATE_KEY_VERIFY)

export const generateSignature = async (account: string, tokenId: number) => {
  try {
    if (!wallet) {
      throw new Error('Wallet failed to initialize.')
    }

    const hash = ethers.utils.solidityKeccak256(
      ['address', 'address', 'string', 'string'],
      [
        CONTRACT_ADDRESS_OPTIMISM,
        account,
        tokenId.toString(),
        MINT_SECRET_VERIFY,
      ]
    )
    const signature = await wallet.signMessage(ethers.utils.arrayify(hash))

    return { signature }
  } catch (e) {
    logger.error('Error generating signature', e)

    return {
      errors: [
        e instanceof Error
          ? e.message
          : 'There was a problem obtaining signature.',
      ],
    }
  }
}
