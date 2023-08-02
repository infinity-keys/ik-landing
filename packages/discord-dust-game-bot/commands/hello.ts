import {
  CommandInteraction,
  MessageReaction,
  SlashCommandBuilder,
} from 'discord.js'

import { eco } from '../ecoDB'
require('dotenv').config()

export const data = new SlashCommandBuilder()
  .setName('gm')
  .setDescription('Give your salutations to the Archivist')
export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }

  const message = await interaction.reply({
    content: `7 13`,
    fetchReply: true,
  })

  const { guild } = interaction

  const filter = (reaction: MessageReaction) => {
    return reaction.emoji.id === process.env.EMOJI_REACTION_IK_ID
  }

  const collected = await message.awaitReactions({
    filter,
    time: 45000,
  })

  for (const reaction of collected.values()) {
    const users = reaction.users.cache.map((user) => user.id)
    for (const userId of users) {
      if (interaction.user.id !== userId) {
        await eco.balance.add(1, userId, guild.id)
      }
    }
  }
}
