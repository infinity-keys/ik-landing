import { balanceOf1155, balanceOf721 } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import { RequestInfo, RequestInit } from 'node-fetch'
import { NftCheckDatum } from 'types/graphql'
import { z } from 'zod'

import { providerLookup } from 'src/lib/lookups'

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url, init))

const poapResData = z
  .object({
    error: z.string(),
    tokenId: z.string(),
  })
  .partial()
  .refine(
    (data) => !!data.error || !!data.tokenId,
    'Should either return error or tokenId.'
  )

type PoapResData = z.infer<typeof poapResData>

const checkPoap = async ({
  account,
  poapEventId,
}: {
  account: string
  poapEventId: string
}) => {
  const url = new URL(
    `/actions/scan/${account}/${poapEventId}`,
    'https://api.poap.tech'
  )

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-Key': process.env.POAP_API_KEY,
    },
  }

  try {
    const res = await fetch(url.toString(), options)
    const data: PoapResData = await res.json()
    poapResData.parse(data)

    if (data.error) return { nftPass: false }

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
}: {
  account: string
  chainId: number
  tokenId: number
  contractAddress: string
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

export const checkNft = async ({
  account,
  requireAllNfts,
  nftCheckData,
}: {
  account: string
  requireAllNfts: boolean
  nftCheckData: NftCheckDatum[]
}) => {
  const allChecks = nftCheckData.map(
    ({ chainId, tokenId, contractAddress, poapEventId }) => {
      if (poapEventId) {
        return checkPoap({ account, poapEventId })
      }

      return checkContract({ account, chainId, tokenId, contractAddress })
    }
  )

  const results = await Promise.all(allChecks)

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
