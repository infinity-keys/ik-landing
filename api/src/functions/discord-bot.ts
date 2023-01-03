import { chainIdLookup } from '@infinity-keys/constants'

const discord = require('discord.js')
const Moralis = require('moralis').default

const client = new discord.Client({
  intents: [],
})

client.login(process.env.DISCORD_MINT_BOT_KEY)

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
})

export const handler = async (event) => {
  const { body, headers } = event
  const parsedBody = await JSON.parse(body)

  try {
    await Moralis.Streams.verifySignature({
      body: parsedBody,
      signature: headers['x-signature'],
    })

    if (parsedBody.txs.length === 0) {
      return { statusCode: 200 }
    }

    const from = parsedBody.txs[0].fromAddress
    const tokenId = parseInt(parsedBody.logs[0].topic1, 16)
    const chainId = parseInt(parsedBody.chainId, 16)
    const chain = chainIdLookup[chainId]

    const channel = await client.channels.fetch(process.env.MINT_CHANNEL)
    channel.send(`Token ID ${tokenId} claimed by ${from} from ${chain}`)

    return {
      statusCode: 200,
    }
  } catch (e) {
    console.log(e)
    console.log('Not Moralis')
    return {
      statusCode: 400,
    }
  }
}
