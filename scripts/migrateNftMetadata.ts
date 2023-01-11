// import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import fetch from 'node-fetch'
import { z } from 'zod'

const { GRAPHQL_ENDPOINT, HASURA_GRAPHQL_ADMIN_SECRET } = process.env

const nftMetadataQuery = `query AllData {
  nft_metadata {
    token_id
    contract_name
    data
    cloudinary_id
  }
}`

const ApiNftMetadata = z.object({
  token_id: z.number().int(),
  contract_name: z.string(),
  data: z.any(),
  cloudinary_id: z.nullable(z.string()),
})

const ApiNftResponse = z.object({
  data: z.object({
    nft_metadata: z.array(ApiNftMetadata),
  }),
})

export default async () => {
  try {
    // Fetch all data we need to migrate
    const apiRaw = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nftMetadataQuery,
        variables: {},
      }),
    }).then((res) => res.json())

    const metadata = ApiNftResponse.parse(apiRaw).data.nft_metadata

    await Promise.all(
      metadata.map(async (data) => {
        const record = await db.nft.create({
          data: {
            tokenId: data.token_id,
            contractName: data.contract_name,
            data: data.data,
            cloudinaryId: data.cloudinary_id,
          },
        })
        console.log(record)
      })
    )
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
