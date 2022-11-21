import { RPCLookup } from '@infinity-keys/constants'
import { balanceOf1155, balanceOf721 } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

export const checkNft: QueryResolvers['checkNft'] = async ({
  account,
  chainId,
  contractAddress,
  tokenId,
}) => {
  // No token Id for ERC721
  const type721 = tokenId ? false : true

  const provider = new ethers.providers.JsonRpcProvider(
    RPCLookup[parseInt(chainId, 10)]
  )

  // Dealing with ERC721
  if (type721) {
    const contract = new ethers.Contract(
      contractAddress,
      balanceOf721,
      provider
    )
    const balance = parseInt(await contract.balanceOf(account), 10)
    return { success: true, nftPass: balance > 0 }
  } else {
    // Dealing with ERC1155
    const tokenIdAsNumber = tokenId ? parseInt(tokenId, 10) : undefined
    const contract = new ethers.Contract(
      contractAddress,
      balanceOf1155,
      provider
    )
    const balance = parseInt(
      await contract.balanceOf(account, tokenIdAsNumber),
      10
    )
    return { success: true, nftPass: balance > 0 }
  }
}
