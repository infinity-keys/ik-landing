import { chainIdLookup } from '@infinity-keys/constants'
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

const discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
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

  console.log(parsedBody)

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
    const nftMetadata = await response.json()
    const image = nftMetadata.image

    console.log(nftMetadata)

    const claimedNFT = new EmbedBuilder()
      .setColor('101d42')
      .setTitle('Infinity Keys')
      .setURL('https://infinitykeys.io')
      .setAuthor({
        name: 'Infinity Keys',
        iconURL:
          'https://res.cloudinary.com/infinity-keys/image/upload/v1671162913/ik-alpha-trophies/Ikey-Antique-Logo_dithbc.png',
        url: 'https://infinitykeys.io',
      })
      .setDescription('New Mint!!')
      .addFields(
        { name: 'Token', value: `${tokenId}`, inline: true },
        { name: 'Mint Address', value: `${from}`, inline: true },
        { name: 'Chain', value: `${chain}`, inline: true }
      )
      .setImage(`${image}`)
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
