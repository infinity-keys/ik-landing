import { chainIdLookup } from '@infinity-keys/constants'
import { cloudinaryUrl } from '@infinity-keys/core'
import { RequestInfo, RequestInit } from 'node-fetch'

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url, init))
const discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const Moralis = require('moralis').default

const client = new discord.Client({
  intents: [],
})

client.login(process.env.DISCORD_MINT_BOT_KEY)

if (!Moralis.Core.isStarted){
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

interface MetadataResponse {
  image: string
}

export const handler = async (event) => {
  const { body, headers } = event
  const parsedBody = await JSON.parse(body)

  try {
    await Moralis.Streams.verifySignature({
      body: parsedBody,
      signature: headers['x-signature'],
    })

    if (parsedBody.txs.length === 0 || !parsedBody.confirmed) {
      return { statusCode: 200 }
    }

    const from = parsedBody.txs[0].fromAddress
    const tokenId = parseInt(parsedBody.logs[0].topic1, 16)
    const chainId = parseInt(parsedBody.chainId, 16)
    const chain = chainIdLookup[chainId]

    const response = await fetch(
      `https://www.infinitykeys.io/api/metadata/achievement?tokenid=${tokenId}`
    )
    const nftMetadata = (await response.json()) as MetadataResponse
    const image = nftMetadata.image

    const url = new URL(image)
    const pathName = url.pathname
    const cloudImage = pathName.split('/').slice(-2).join('/')

    const claimedNFT = new EmbedBuilder()
      .setColor('101d42')
      .setTitle('Infinity Keys')
      .setAuthor({
        name: 'Infinity Keys',
        iconURL:
          'https://res.cloudinary.com/infinity-keys/image/upload/v1671162913/ik-alpha-trophies/Ikey-Antique-Logo_dithbc.png',
        url: 'https://infinitykeys.io',
      })
      .setDescription('New Mint!!')
      .setThumbnail(cloudinaryUrl(cloudImage, 50, 50, false, 1))
      .addFields(
        { name: 'Token', value: `${tokenId}`, inline: true },
        { name: 'Mint Address', value: `${from}`, inline: true },
        { name: 'Chain', value: `${chain}`, inline: true }
      )

      .setTimestamp()
      .setFooter({
        text: 'Claimed',
        iconURL:
          'https://res.cloudinary.com/infinity-keys/image/upload/v1671162913/ik-alpha-trophies/Ikey-Antique-Logo_dithbc.png',
      })

    const channel = await client.channels.fetch(process.env.MINT_CHANNEL)
    channel.send({ embeds: [claimedNFT] })

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
