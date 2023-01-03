import { chainIdLookup } from '@infinity-keys/constants'

const discord = require('discord.js')
const Moralis = require('moralis').default

const client = new discord.Client({
  intents: [],
})

client.login(process.env.PASS)

export const handler = async (event) => {
  const { body, headers } = event
  console.log({ body, headers })
  const parsedBody = await JSON.parse(body)

  try {
    await Moralis.Streams.verifySignature({
      body: parsedBody,
      signature: headers['x-signature'],
    })

    // console.log(body)

    const from = parsedBody.txs[0].fromAddress
    const tokenId = parseInt(parsedBody.logs[0].topic1, 16)
    const chainId = parseInt(parsedBody.chainId, 16)
    const chain = chainIdLookup[chainId]

    const channel = await client.channels.fetch(process.env.CHANNEL)
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
Moralis.start({
  apiKey: process.env.APIKEY,
})
