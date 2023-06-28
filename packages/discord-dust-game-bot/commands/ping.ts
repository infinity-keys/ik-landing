// const { SlashCommandBuilder } = require('discord.js')
import { SlashCommandBuilder } from 'discord.js'
import { Interaction } from 'discord.js'

import { eco } from '../ecoDB'

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!')

export async function execute(interaction: Interaction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  const message = await interaction.reply({
    content: `Pong!`,
    fetchReply: true,
  })

  // const emoji = client.emojis.cache.find(
  //   (emoji) => emoji.id === '1000793300103606343'
  // )

  // message.react(emoji)
  // message.react('👍🏾')
  const { guild, member } = interaction
  // console.log('interaction', interaction)
  // const balance = eco.balance.add(10, member.user.id, guild.id)

  const filter = (reaction) => {
    return reaction.emoji.name === '👍🏾'
  }

  // const collector = message.createReactionCollector({ filter, time: 15000 })

  // collector.on('collect', (reaction, user) => {
  //   console.log(`Collected ${reaction.emoji.name} from ${user.tag}`)
  // })

  // collector.on('end', (collected) => {
  //   console.log(`Collected ${collected.size} items`)
  // })

  message
    .awaitReactions({ filter, max: 5, time: 30000 })
    .then((collected) => {
      const user = collected.get('👍🏾').users
      console.log('users', user)
      eco.balance.add(10, member.user.id, guild.id)
    })
    .catch((collected) => {
      // console.log('collected', collected)
      console.log(`After 10 seconds, only ${collected.size} out of 5 reacted`)
    })
}

// const ecoUsers = await eco.users.all()
//     for (const ecoUser of ecoUsers) {
//       await eco.database.delete(`${ecoUser.guildID}.${ecoUser.id}`)
//     }
