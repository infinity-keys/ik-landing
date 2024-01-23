import {
  CONTRACT_ADDRESS_OPTIMISM,
  OPTIMISM_CHAIN_ID,
} from '@infinity-keys/constants'
import { IKAchievementABI__factory } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import { nanoid } from 'nanoid'

import { logger } from 'src/lib/logger'
import { providerLookup } from 'src/lib/lookups'

class CreateNftError extends Error {}

/**
 * In production we need the private key from a wallet that has been authorized
 * to create NFTs.
 *
 * Dev and testing environments also need a private key to keep ethers from
 * throwing an error. Publicly know "private" keys can be found at this link.
 * Do not send any real assets to these addresses.
 *
 * https://hardhat.org/hardhat-network/docs/overview#running-stand-alone-in-order-to-support-wallets-and-other-software
 */

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
      throw new CreateNftError('Wallet failed to initialize.')
    }

    // Create a contract instance using a signer (wallet) that is authorized to
    // create NFTs
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_OPTIMISM,
      IKAchievementABI__factory.abi,
      wallet
    )

    // The next token ID according to the contract at this current moment
    // NOTE: This is not guaranteed to be correct by the time the NFT is created
    const probableTokenId: number = (await contract.totalSupplyAll()).length
    // The ID for the NFT's metadata URI and DB lookup
    const lookupId = nanoid()

    // @TODO: need to handle this new case in our api function
    const tokenUri = new URL('metadata', 'https://api.infinitykeys.io')
    tokenUri.searchParams.append('lookupId', lookupId)

    // Creates a new NFT on the contract
    const newNft = await contract.addTokenUngated(true, tokenUri.toString())

    logger.info(
      `Invoked 'addTokenUngated' for ${lookupId}. Transaction hash: ${newNft.hash}`
    )

    // Wait until the transaction has completed
    const receipt = await newNft.wait()

    // Transaction was successful and was not reverted by the contract
    if (receipt.status === 1) {
      const lastTokenId = (await contract.totalSupplyAll()).length - 1

      // No new tokens were created while this function was running,
      // so `probableTokenId` is the correct NFT token ID
      if (probableTokenId === lastTokenId) {
        return { tokenId: probableTokenId, lookupId }
      }

      // Other tokens were created, so we check the new tokens' URIs to ensure
      // we have the correct NFT token ID
      let idToCheck = probableTokenId

      while (idToCheck <= lastTokenId) {
        // @TODO: Might need a timeout for Infura calls
        const uri = await contract.uri(idToCheck)
        const url = new URL(uri)
        const id = url.searchParams.get('lookupId')

        // If the token's URI lookup ID matches the one we created above,
        // we have found the right NFT
        if (id === lookupId) {
          return { tokenId: idToCheck, lookupId }
        }

        idToCheck++

        const errorMessage = `Could not find URI id '${lookupId}' after successful transaction. Receipt: ${receipt.transactionHash}`

        logger.error(errorMessage)
        throw new CreateNftError(errorMessage)
      }
    }

    const errorMessage = `Transaction failed for hash ${receipt.transactionHash}`

    logger.error(errorMessage)
    throw new CreateNftError(errorMessage)
  } catch (error) {
    logger.error('Error in `createContractNft`', error)

    // Hide the ugly ethers errors from the front end
    if (error instanceof CreateNftError) {
      throw error
    } else {
      throw new Error('Error occurred in `createContractNft`')
    }
  }
}
