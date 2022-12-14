import { balanceOf1155, balanceOf721 } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

import { providerLookup } from 'src/lib/lookups'

export const checkNft: QueryResolvers['checkNft'] = async ({
  account,
  chainId,
  contractAddress,
  tokenId,
}) => {
  // No token Id for ERC721
  // @NOTE: tokenId can be zero, which is falsy. Can't just check for existence tokenId
  const abi = tokenId !== undefined ? balanceOf1155 : balanceOf721

  const provider = providerLookup[chainId]

  // @BLOOM: Using provider here- maybe a better way ?
  // This contract is a generic one, thus can't use our contract instances
  const contract = new ethers.Contract(contractAddress, abi, provider)

  // could this instead be (account, tokenId && tokenId)
  const balance = parseInt(
    tokenId !== undefined
      ? await contract.balanceOf(account, tokenId)
      : await contract.balanceOf(account),
    10
  )
  return { success: true, nftPass: balance > 0 }
}
