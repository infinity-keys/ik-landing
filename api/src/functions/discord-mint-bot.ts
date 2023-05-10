import { chainIdLookup } from '@infinity-keys/constants'
import { cloudinaryUrl } from '@infinity-keys/core'
import { APIGatewayEvent } from 'aws-lambda'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const Moralis = require('moralis').default

const client = new discord.Client({
  intents: [],
})

client.login(process.env.DISCORD_MINT_BOT_KEY)

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

export const handler = async (event: APIGatewayEvent) => {
  const { body, headers } = event
  const parsedBody = await JSON.parse(body || '')

  try {
    await Moralis.Streams.verifySignature({
      body: parsedBody,
      signature: headers['x-signature'],
    })
    if (
      parsedBody.txs.length === 0 ||
      !parsedBody.confirmed ||
      !parsedBody.logs.length
    ) {
      return { statusCode: 200 }
    }

    const from = parsedBody.txs[0].fromAddress
    const tokenId = parseInt(parsedBody.logs[0].topic1, 16)
    const chainId = parseInt(parsedBody.chainId, 16)
    const chain = chainIdLookup[chainId]

    // to log basic info on each transaction
    logger.info(
      `from address: ${from} and minted tokenID: ${tokenId} from chain: ${chain}`
    )

    const image = await db.nft.findUnique({
      where: {
        contractName_tokenId: {
          contractName: 'achievement',
          tokenId,
        },
      },
      select: { cloudinaryId: true },
    })

    if (!image) {
      return {
        statusCode: 400,
      }
    }

    const defaultImageUrl =
      'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/sm-logo_wrpzif.png'

    const claimedNFT = new EmbedBuilder()
      .setColor('101d42')
      .setTitle("There's treasure everywhere...")
      .setAuthor({
        name: 'Infinity Keys',
        iconURL: defaultImageUrl,
        url: 'https://infinitykeys.io',
      })
      .setDescription(`Key ${tokenId} collected`)
      .setThumbnail(
        cloudinaryUrl(
          image ? image.cloudinaryId : defaultImageUrl,
          50,
          50,
          false,
          1
        )
      )

      .setTimestamp()
      .setFooter({
        text: 'Collected',
        iconURL: defaultImageUrl,
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
