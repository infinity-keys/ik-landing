import { CONTRACT_ADDRESS_OPTIMISM } from '@infinity-keys/constants'
import { ethers } from 'ethers'

import { logger } from './logger'

const { PRIVATE_KEY_VERIFY, MINT_SECRET_VERIFY } = process.env

let wallet: ethers.Wallet | undefined

if (PRIVATE_KEY_VERIFY) {
  wallet = new ethers.Wallet(PRIVATE_KEY_VERIFY)
}

export const mint = async (
  accessToken: string,
  account: string,
  tokenId: number
) => {
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

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: CONTRACT_ADDRESS_OPTIMISM,
        abi: 'claim(uint256,bytes) external payable',
        args: [tokenId, signature],
      }),
    }

    const res = await fetch(
      `https://api.usekeyp.com/v1/contracts/method/write`,
      options
    )

    if (res.status !== 200) {
      // @TODO: since first call will fail, should we just recall it once here?
      throw new Error(
        'There was a problem with gasless minting. Please try again.'
      )
    }

    const { status, explorerUrl } = await res.json()
    return { success: status === 'SUCCESS', explorerUrl }
  } catch (e) {
    logger.error('Error claiming NFT', e)
    if (e instanceof Error) {
      return { errors: [e.message] }
    }
    return { errors: ['There was a problem claiming your NFT.'] }
  }
}
