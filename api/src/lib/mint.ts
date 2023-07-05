import { CONTRACT_ADDRESS_OPTIMISM } from '@infinity-keys/constants'
import { ethers } from 'ethers'

import { logger } from './logger'

const { PRIVATE_KEY_VERIFY, MINT_SECRET_VERIFY } = process.env

let wallet: ethers.Wallet | undefined

if (PRIVATE_KEY_VERIFY) {
  wallet = new ethers.Wallet(PRIVATE_KEY_VERIFY)
}

const fetchWithRetry = async (
  func: () => Promise<Response>,
  maxAttempts = 3,
  interval = 5000
) => {
  try {
    const res = await func()

    if (res.status === 401) {
      return { authorized: false }
    }

    if (res.status !== 200) {
      throw new Error('There was a problem minting your NFT. Please try again.')
    }

    const data = await res.json()
    return data
  } catch (error) {
    if (maxAttempts <= 1) {
      // If no more attempts left, rethrow the error
      throw error
    }

    // If the function failed, wait for the interval before trying again
    await new Promise((resolve) => setTimeout(resolve, interval))

    // Call the function again with one fewer attempt
    await fetchWithRetry(func, maxAttempts - 1, interval)
  }
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

    const { status, explorerUrl, authorized } = await fetchWithRetry(async () =>
      fetch(`https://api.usekeyp.com/v1/contracts/method/write`, options)
    )

    if (!authorized) {
      return { authorized }
    }

    return { success: status === 'SUCCESS', explorerUrl }
  } catch (e) {
    logger.error('Error claiming NFT', e)
    if (e instanceof Error) {
      return { errors: [e.message] }
    }
    return { errors: ['There was a problem claiming your NFT.'] }
  }
}
