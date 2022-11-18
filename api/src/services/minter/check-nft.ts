import abi1155 from '@infinity-keys/contracts/src/balanceOf1155.json'
import abi721 from '@infinity-keys/contracts/src/balanceOf721.json'
import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

import { RPCLookup } from 'src/lib/walletConstants'

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
    const contract = new ethers.Contract(contractAddress, abi721, provider)
    const balance = parseInt(await contract.balanceOf(account), 10)
    return { success: true, nftPass: balance > 0 }
  } else {
    // Dealing with ERC1155
    const tokenIdAsNumber = tokenId ? parseInt(tokenId, 10) : undefined
    const contract = new ethers.Contract(contractAddress, abi1155, provider)
    const balance = parseInt(
      await contract.balanceOf(account, tokenIdAsNumber),
      10
    )
    return { success: true, nftPass: balance > 0 }
  }
}
