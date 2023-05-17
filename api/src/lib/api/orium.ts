import { OriumCheckType } from 'types/graphql'

import { logger } from 'src/lib/logger'

const ORIUM_API_URL =
  'https://subgraph.satsuma-prod.com/8c268d3e8b83112a7d0c732a9b88ba1c732da600bffaf68790171b9a0b5d5394/orium-scholarships-subgraph/api'

const REFERER =
  'https://subgraph.satsuma-prod.com/8c268d3e8b83112a7d0c732a9b88ba1c732da600bffaf68790171b9a0b5d5394/orium-scholarships-subgraph/playground'

const ORIGIN = 'https://subgraph.satsuma-prod.com'

const HAS_CREATED_SCHOLARSHIP_QUERY = JSON.stringify({
  query: 'query Accounts ($limit: Int) { accounts(first: $limit) { id } }',
  operationName: 'Accounts',
  variables: { limit: 2 },
})

const HAS_CREATED_VAULT_QUERY = JSON.stringify({
  query: 'query Accounts ($limit: Int) { accounts(first: $limit) { id } }',
  operationName: 'Accounts',
  variables: { limit: 2 },
})

const HAS_DEPOSITED_NFT_QUERY = JSON.stringify({
  query: 'query Accounts ($limit: Int) { accounts(first: $limit) { id } }',
  operationName: 'Accounts',
  variables: { limit: 2 },
})

const checkTypeLookup: {
  [key in OriumCheckType]: string
} = {
  HAS_CREATED_SCHOLARSHIP: HAS_CREATED_SCHOLARSHIP_QUERY,
  HAS_CREATED_VAULT: HAS_CREATED_VAULT_QUERY,
  HAS_DEPOSITED_NFT: HAS_DEPOSITED_NFT_QUERY,
}

export const checkOriumApi = async (
  account: string,
  checkType: OriumCheckType
) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json, multipart/mixed',
        'content-type': 'application/json',
        origin: ORIGIN,
        referer: REFERER,
      },
      body: checkTypeLookup[checkType],
    }

    const res = await fetch(ORIUM_API_URL, options)
    const data = await res.json()
    console.log(JSON.stringify(data, null, 2))

    return {
      success: false,
    }
  } catch {
    logger.error(`Failed Orium api check for ${account}`)
    return { errors: ['Error checking Orium.'] }
  }
}
