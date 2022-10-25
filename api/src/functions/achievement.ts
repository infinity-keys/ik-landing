import { nftByTokenId } from 'src/services/nfts/nfts'

export const handler = async (event) => {
  const { tokenId } = event.queryStringParameters
  if (!tokenId) return { statusCode: 400 }

  const { data } = await nftByTokenId({ tokenId: parseInt(tokenId, 10) })
  if (!data) return { statusCode: 400 }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
}
