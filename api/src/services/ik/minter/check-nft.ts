import { balanceOf1155, balanceOf721 } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

import { providerLookup } from 'src/lib/lookups'

export const checkNft: QueryResolvers['checkNft'] = async ({
  account,
  chainId,
  contractAddress,
  tokenId,
  // poapEventId,
}) => {
  // if (poapEventId) {
  //   const url = `https://api.poap.tech/actions/scan/${account}/${poapEventId}`

  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       'X-API-Key': process.env.POAP_API_KEY,
  //     },
  //   }

  //   try {
  //     const res = await fetch(url, options)
  //     const data = await res.json()

  //     // If no event or error return false
  //     // Have to move this return statement below to allow for cookies!
  //     if (!data.event) return { success: true, nftPass: false }
  //     return { success: true, nftPass: true }
  //   } catch (e) {
  //     return { success: false, nftPass: false }
  //   }
  // }

  // No token Id for ERC721
  // @NOTE: tokenId can be zero, which is falsy. Can't just check for existence tokenId
  // const abi =
  //   typeof tokenId === 'number' && !poapEventId ? balanceOf1155 : balanceOf721
  const abi = typeof tokenId === 'number' ? balanceOf1155 : balanceOf721

  const provider = providerLookup[chainId]

  // @BLOOM: Using provider here- maybe a better way ?
  // This contract is a generic one, thus can't use our contract instances
  const contract = new ethers.Contract(contractAddress, abi, provider)

  const balance = parseInt(
    typeof tokenId === 'number'
      ? await contract.balanceOf(account, tokenId)
      : await contract.balanceOf(account),
    10
  )

  return { success: true, nftPass: balance > 0 }
}
