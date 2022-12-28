import { balanceOf1155, balanceOf721 } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import fetch from 'node-fetch'
import { QueryResolvers } from 'types/graphql'

import { providerLookup } from 'src/lib/lookups'

export const checkNft: QueryResolvers['checkNft'] = async ({
  account,
  chainId,
  contractAddress,
  tokenId,
}) => {
  if (parseInt(chainId, 10) === 0) {
    // If chain id is set to 0 (no chain is 0) then it is a poap
    // no contract address for poap, tokenId = Poap Event Id
    const url = `https://api.poap.tech/actions/scan/${account}/${tokenId}`

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': process.env.POAP_API_KEY,
      },
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        if (json.event) {
          // Have to move this return statement below to allow for cookies!
          return { success: true }
        }
      })
      .catch((err) => console.error('error:' + err))

    // If no event or error return false
    // Have to move this return statement below to allow for cookies!
    return { success: false }
  }

  // No token Id for ERC721
  const type721 = tokenId ? false : true

  const provider = new ethers.providers.JsonRpcProvider(
    RPCLookup[parseInt(chainId, 10)]
  )

  let nftPass

  // Dealing with ERC721
  if (type721) {
    try {
      const contract = new ethers.Contract(contractAddress, abi721, provider)
      const balance = parseInt(await contract.balanceOf(account), 10)
      nftPass = balance > 0
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  } else {
    // Dealing with ERC1155
    try {
      const tokenIdAsNumber = tokenId ? parseInt(tokenId, 10) : undefined
      const contract = new ethers.Contract(contractAddress, abi1155, provider)
      const balance = parseInt(
        await contract.balanceOf(account, tokenIdAsNumber),
        10
      )
      nftPass = balance > 0
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }

  return { success: true, nftPass }
}
