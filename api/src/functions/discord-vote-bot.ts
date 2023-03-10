const Moralis = require("moralis").default;
const discord = require("discord.js");
require("dotenv").config();
const { EmbedBuilder } = require('discord.js')

const client = new discord.Client({
    intents: [],
});

client.login(process.env.DISCORD_VOTE_BOT_KEY);

if (!Moralis.Core.isStarted){
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

export const handler = async (event) => {
  const { body, headers } = event
  const parsedBody = await JSON.parse(body)

  // console.log(parsedBody);
  // console.log(headers["x-signature"]);

  try {
    await Moralis.Streams.verifySignature({
      body: parsedBody,
      signature: headers["x-signature"],
    });

    if (parsedBody.txs.length === 0 || !parsedBody.confirmed) {
            return { statusCode: 200 }
          }

    const from = parsedBody.txs[0].fromAddress
    const rawVote = parsedBody.logs[0].data
    // const vote = rawVote === 1? "True" : "False"
    // const hash = parsedBody.logs[0].transactionHash

    const voteAlert = new EmbedBuilder()
      .setColor('101d42')
      .setTitle('Infinity Keys')
      .setAuthor({
        name: 'Infinity Keys',
        iconURL:
          'https://res.cloudinary.com/infinity-keys/image/upload/v1671162913/ik-alpha-trophies/Ikey-Antique-Logo_dithbc.png',
        url: 'https://infinitykeys.io',
      })
      .setDescription('New Curve Vote Has Been Cast!!')
      .addFields(
        { name: 'From', value: `${from}`, inline: true },
        // { name: 'Vote', value: `${vote}`, inline: true },
      )

      .setTimestamp()
      .setFooter({
        text: 'Vote Casted',
        iconURL:
          'https://res.cloudinary.com/infinity-keys/image/upload/v1671162913/ik-alpha-trophies/Ikey-Antique-Logo_dithbc.png',
      })

    const channel = await client.channels.fetch(process.env.MINT_CHANNEL)
    channel.send({ embeds: [voteAlert] })

    return { statusCode: 200 };
  } catch (e) {
    console.log(e);
    console.log("Not Moralis");
    return { statusCode: 400 };
  }
};


