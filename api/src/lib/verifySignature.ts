import { contractAddressLookup } from '@infinity-keys/constants'
import { ethers } from 'ethers'

const { PRIVATE_KEY_VERIFY, MINT_SECRET_VERIFY } = process.env

let wallet: ethers.Wallet | undefined

if (PRIVATE_KEY_VERIFY) {
  wallet = new ethers.Wallet(PRIVATE_KEY_VERIFY)
}

export const getSignature = async (
  chainId: number,
  account: string,
  tokenId: number
) => {
  const contractAddress = contractAddressLookup[chainId]

  if (!contractAddress || !wallet) return

  const hash = ethers.utils.solidityKeccak256(
    ['address', 'address', 'string', 'string'],
    [contractAddress, account, tokenId.toString(), MINT_SECRET_VERIFY]
  )

  return await wallet.signMessage(ethers.utils.arrayify(hash))
}
