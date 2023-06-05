import { OriumCheckType } from 'types/graphql'

import { logger } from 'src/lib/logger'

const ORIUM_API_URL =
  'https://subgraph.satsuma-prod.com/8c268d3e8b83112a7d0c732a9b88ba1c732da600bffaf68790171b9a0b5d5394/orium-scholarships-subgraph/api'

const REFERER =
  'https://subgraph.satsuma-prod.com/8c268d3e8b83112a7d0c732a9b88ba1c732da600bffaf68790171b9a0b5d5394/orium-scholarships-subgraph/playground'

const ORIGIN = 'https://subgraph.satsuma-prod.com'

type OriumObjectType = {
  createBody: (owner: string) => string
  formatResponse: (data: Record<string, unknown>) => { success: boolean }
}

const HAS_CREATED_SCHOLARSHIP: OriumObjectType = {
  createBody(owner) {
    return JSON.stringify({
      query:
        'query GetScholarships ($first: Int, $owner: String) { scholarshipPrograms(first: 1, where:{ owner: $owner }) { id } }',
      variables: { first: 1, owner },
    })
  },
  formatResponse(data) {
    if (
      !('scholarshipPrograms' in data) ||
      !Array.isArray(data.scholarshipPrograms)
    ) {
      throw new Error('Error formatting response for HAS_CREATED_SCHOLARSHIP')
    }

    return { success: !!data.scholarshipPrograms.length }
  },
}

const HAS_CREATED_VAULT: OriumObjectType = {
  createBody(owner) {
    return JSON.stringify({
      query:
        'query GetVaults ($first: Int, $owner: String) { vaults(first: 1, where:{ owner: $owner }) { id } }',
      variables: { first: 1, owner },
    })
  },
  formatResponse(data) {
    if (!('vaults' in data) || !Array.isArray(data.vaults)) {
      throw new Error('Error formatting response for HAS_CREATED_VAULT')
    }

    return { success: !!data.vaults.length }
  },
}

const HAS_DEPOSITED_NFT: OriumObjectType = {
  createBody(owner) {
    return JSON.stringify({
      query:
        'query GetDepositedNfts ($first: Int, $owner: String) { nfts(first: $first, where: {vault_: {owner: $owner}}) { id } }',
      variables: { first: 1, owner },
    })
  },
  formatResponse(data) {
    if (!('nfts' in data) || !Array.isArray(data.nfts)) {
      throw new Error('Error formatting response for HAS_DEPOSITED_NFT')
    }

    return { success: !!data.nfts.length }
  },
}

const checkTypeLookup: {
  [key in OriumCheckType]: OriumObjectType
} = {
  HAS_CREATED_SCHOLARSHIP,
  HAS_CREATED_VAULT,
  HAS_DEPOSITED_NFT,
}

export const checkOriumApi = async (
  account: string,
  checkType: OriumCheckType
): Promise<{
  success: boolean
  errors?: string[]
}> => {
  const oriumCheck = checkTypeLookup[checkType]

  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json, multipart/mixed',
        'content-type': 'application/json',
        origin: ORIGIN,
        referer: REFERER,
      },
      body: oriumCheck.createBody(account.toLowerCase()),
    }

    const res = await fetch(ORIUM_API_URL, options)
    const { data } = await res.json()

    if (typeof data !== 'object' || data === null) {
      throw new Error('Error fetching data from Orium.')
    }

    return oriumCheck.formatResponse(data)
  } catch (e) {
    logger.error(`Failed Orium api check for ${account}`, e)

    if (e instanceof Error) {
      return { errors: [e.message], success: false }
    }
    return { errors: ['Error checking Orium.'], success: false }
  }
}
