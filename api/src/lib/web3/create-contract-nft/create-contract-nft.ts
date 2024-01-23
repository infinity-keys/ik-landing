import {
  CONTRACT_ADDRESS_OPTIMISM,
  OPTIMISM_CHAIN_ID,
} from '@infinity-keys/constants'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import { nanoid } from 'nanoid'

import { logger } from 'src/lib/logger'
import { providerLookup } from 'src/lib/lookups'

const { AUTHORIZED_PRIVATE_KEY, NODE_ENV } = process.env

if (!AUTHORIZED_PRIVATE_KEY && NODE_ENV === 'production') {
  throw new Error('Missing authorized wallet secrets')
}
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

const wallet = new ethers.Wallet(
  AUTHORIZED_PRIVATE_KEY || '',
  // providerLookup[OPTIMISM_CHAIN_ID]
  provider
)

export const createContractNft = async () => {
  try {
    if (!wallet) {
      throw new Error('Wallet failed to initialize.')
    }

    const contract = new ethers.Contract(
      // CONTRACT_ADDRESS_OPTIMISM,
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      IKAchievementABI__factory.abi,
      wallet
    )
    const actualId = (await contract.totalSupplyAll()).length
    // const probableTokenId = (await contract.totalSupplyAll()).length
    const probableTokenId = actualId - 4
    const stringId = nanoid()

    // @TODO: need to handle this new case in our api function
    const tokenUri = new URL('metadata', 'https://api.infinitykeys.io')
    tokenUri.searchParams.append('id', stringId)

    const newNft = await contract.addTokenUngated(true, tokenUri.toString())
    logger.info(
      `invoked 'addTokenUngated' for ${stringId}. Transaction hash: ${newNft.hash}`
    )

    // @TODO: Can this hang forever? If yes, add a timeout.
    // @TODO: How long does this take in production?
    const receipt = await newNft.wait()

    if (receipt.status === 1) {
      // tx was successful
      const lastTokenId = (await contract.totalSupplyAll()).length - 1
      if (probableTokenId === lastTokenId) {
        // everything worked correctly
        return {
          tokenId: probableTokenId,
        }
      } else {
        // other transactions have gone through, check contract to get correct
        // token id
        let idToCheck = probableTokenId

        while (idToCheck <= lastTokenId) {
          const uri = await contract.uri(idToCheck)
          const url = new URL(uri)
          const id = url.searchParams.get('id')

          if (id === stringId) {
            return {
              tokenId: idToCheck,
            }
          }

          idToCheck++
        }

        throw new Error('There was a problem finding token URI')
      }
    }

    throw new Error('Transaction failed')
  } catch (error) {
    console.log(error)
    // logger.error('Error in `createContractNft`', error)
  }
}
