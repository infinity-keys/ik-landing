import { ethers } from 'ethers'

import { contractAddressLookup } from './walletConstants'

const { PRIVATE_KEY_VERIFY, MINT_SECRET_VERIFY } = process.env

const wallet = new ethers.Wallet(PRIVATE_KEY_VERIFY)

export const getSignature = async (
  chainId: number,
  account: string,
  tokenId: string
) => {
  const contractAddress = contractAddressLookup[chainId]

  if (!contractAddress) return

  const hash = ethers.utils.solidityKeccak256(
    ['address', 'address', 'string', 'string'],
    [contractAddress, account, tokenId, MINT_SECRET_VERIFY]
  )

  return await wallet.signMessage(ethers.utils.arrayify(hash))
}
