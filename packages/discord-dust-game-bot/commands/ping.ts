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

  const { guild } = interaction

  const filter = (reaction) => {
    return reaction.emoji.name === '👍🏾'
  }

  await message
    .awaitReactions({ filter, max: 5, time: 30000 })
    .then(async (collected) => {
      for (const reaction of collected.values()) {
        const user = reaction.users.cache.map((user) => user.id)
        await eco.balance.add(10, `${user}`, guild.id)
      }
    })
    .catch((collected) => {
      console.log(`After 10 seconds, only ${collected.size} out of 5 reacted`)
    })
}
