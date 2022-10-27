import { nftByContractAndTokenId } from 'src/services/nfts/nfts'

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') return { statusCode: 404 }

  const { contractName, tokenId } = event.queryStringParameters
  if (!tokenId || !contractName) return { statusCode: 400 }

  try {
    const { data } = await nftByContractAndTokenId({
      tokenId: parseInt(tokenId, 10),
      contractName,
    })
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  } catch (e) {
    return { statusCode: 400 }
  }
}
