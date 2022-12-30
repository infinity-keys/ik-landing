import { chainIdLookup } from '@infinity-keys/constants'
//import Web3 from 'web3'

const discord = require('discord.js')
const Moralis = require('moralis').default

//const web3 = new Web3()
require('dotenv').config()

const client = new discord.Client({
  intents: [],
})

client.login(process.env.PASS)

export const handler = async (event) => {
  const { body, headers } = event

  try {
    await Moralis.Streams.verifySignature({
      body,
      signature: headers['x-signature'],
    })

    // console.log(body)

    const from = body.txs[0].fromAddress
    const tokenId = parseInt(body.logs[0].topic1, 16)
    const chainId = parseInt(body.chainId, 16)
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
