import { balanceOf1155, balanceOf721 } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

import { providerLookup } from 'src/lib/lookups'

const checkPoap = async ({ account, poapEventId }) => {
  const url = `https://api.poap.tech/actions/scan/${account}/${poapEventId}`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-Key': process.env.POAP_API_KEY,
    },
  }

  try {
    const res = await fetch(url, options)
    const data = await res.json()

    // If no event or error return false
    // Have to move this return statement below to allow for cookies!
    if (!data.event) return { nftPass: false }

    return { nftPass: true }
  } catch (e) {
    return { errors: ['There was a problem checking your POAP'] }
  }
}

const checkContract = async ({
  account,
  chainId,
  tokenId,
  contractAddress,
}) => {
  // No token Id for ERC721
  // @NOTE: tokenId can be zero, which is falsy. Can't just check for existence tokenId
  const abi = typeof tokenId === 'number' ? balanceOf1155 : balanceOf721
  const provider = providerLookup[chainId]

  try {
    // @BLOOM: Using provider here- maybe a better way ?
    // This contract is a generic one, thus can't use our contract instances
    const contract = new ethers.Contract(contractAddress, abi, provider)

    // create args for contract, ERC721 only takes account, 1155 takes account and tokenId
    const args = [account, tokenId ?? null].filter((n) => n === 0 || n)

    const balance = parseInt(await contract.balanceOf(...args), 10)

    return { nftPass: balance > 0 }
  } catch {
    return { errors: ['There was a problem checking your NFT'] }
  }
}

export const checkNft: QueryResolvers['checkNft'] = async ({
  account,
  requireAllNfts,
  nftCheckData,
}) => {
  const gottaCheckEmAll = nftCheckData.map(
    ({ chainId, tokenId, contractAddress, poapEventId }) => {
      if (poapEventId) {
        return checkPoap({ account, poapEventId })
      }

      return checkContract({ account, chainId, tokenId, contractAddress })
    }
  )

  const results = await Promise.all(gottaCheckEmAll)

  const resErrors = new Set(
    results
      .filter((res) => res.errors?.length > 0)
      .flatMap(({ errors }) => errors)
  )

  if ([...resErrors].length > 0) {
    return { errors: [...resErrors] }
  }

  const nftPass = requireAllNfts
    ? results.every((b) => b.nftPass)
    : results.some((b) => b.nftPass)

  return { nftPass }
}
