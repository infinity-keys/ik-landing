import {
  CONTRACT_ADDRESS_OPTIMISM,
  OPTIMISM_CHAIN_ID,
} from '@infinity-keys/constants'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { ethers } from 'ethers'

import { logger } from 'src/lib/logger'
import { providerLookup } from 'src/lib/lookups'

const { AUTHORIZED_PRIVATE_KEY, NODE_ENV } = process.env

if (!AUTHORIZED_PRIVATE_KEY && NODE_ENV === 'production') {
  throw new Error('Missing authorized wallet secrets')
}

const wallet = new ethers.Wallet(
  AUTHORIZED_PRIVATE_KEY || '',
  providerLookup[OPTIMISM_CHAIN_ID]
)

export const createContractNft = async () => {
  try {
    if (!wallet) {
      throw new Error('Wallet failed to initialize.')
    }

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_OPTIMISM,
      IKAchievementABI__factory.abi,
      wallet
    )

    const newTokenId = (await contract.totalSupplyAll()).length

    const tokenUri = new URL('metadata', 'https://api.infinitykeys.io')
    tokenUri.searchParams.append('contractName', 'achievement')
    tokenUri.searchParams.append('tokenId', newTokenId.toString())

    await contract.addTokenUngated(true, tokenUri)

    return {
      tokenId: newTokenId,
    }
  } catch (error) {
    logger.error('Error in `createContractNft`', error)
  }
}
