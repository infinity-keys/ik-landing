const Moralis = require('moralis').default
const discord = require('discord.js')
require('dotenv').config()
const { EmbedBuilder } = require('discord.js')

const client = new discord.Client({
  intents: [],
})

client.login(process.env.DISCORD_VOTE_BOT_KEY)

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
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
    const voteHex = parsedBody.logs[0].data.slice(0, 66)
    const vote = parseInt(voteHex, 16) === 1 ? 'True' : 'False'

    const voteAlert = new EmbedBuilder()
      .setColor('101d42')
      .setTitle('Aavegotchi DAO Vote')
      .setAuthor({
        name: 'Infinity Keys',
        iconURL:
          'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/website-assets/hold-your-gotchi-embed_a2y1pq.jpg',
        url: 'https://infinitykeys.io',
      })
      .setDescription('New Curve Vote Has Been Cast! 👻')
      .addFields(
        { name: 'From', value: `${from}`, inline: true },
        { name: 'Vote', value: `${vote}`, inline: true }
      )

      .setTimestamp()
      .setFooter({
        text: 'Voted',
        iconURL:
          'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/website-assets/hold-your-gotchi-embed_a2y1pq.jpg',
      })

    const channel = await client.channels.fetch(process.env.VOTE_ALERT_CHANNEL)
    channel.send({ embeds: [voteAlert] })

    return { statusCode: 200 }
  } catch (e) {
    console.log(e)
    console.log('Not Moralis')
    return { statusCode: 400 }
  }
}
