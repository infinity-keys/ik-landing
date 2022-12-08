import { balanceOf1155 } from '@infinity-keys/contracts'
import { balanceOf721 } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

import { providerLookup } from 'src/lib/contractLookup'

export const checkNft: QueryResolvers['checkNft'] = async ({
  account,
  chainId,
  contractAddress,
  tokenId,
}) => {
  // No token Id for ERC721
  const abi = tokenId ? balanceOf1155 : balanceOf721

  const provider = providerLookup[chainId]

  // @BLOOM: Using provider here- maybe a better way ?
  // This contract is a generic one, thus can't use our contract instances
  const contract = new ethers.Contract(contractAddress, abi, provider)

  // could this instead be (account, tokenId && tokenId)
  const balance = parseInt(
    tokenId
      ? await contract.balanceOf(account, tokenId)
      : await contract.balanceOf(account),
    10
  )
  return { success: true, nftPass: balance > 0 }
}
