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
    return (
      reaction.emoji.id === process.env.EMOJI_REACTION_IK_ID ||
      reaction.emoji.id === '1065285126935805962' ||
      reaction.emoji.id === '1106277546498199602' ||
      reaction.emoji.id === '1083028535314239610' ||
      reaction.emoji.id === '1083028536568320111'
    )
  }

  try {
    const collected = await message.awaitReactions({
      filter,
      time: 45000,
    })

    console.log('collection', collected)

    for (const reaction of collected.values()) {
      const users = reaction.users.cache.map((user) => user.id)

      for (const userId of users) {
        if (interaction.user.id !== userId) {
          await eco.balance.add(1, userId, guild.id)
        }
      }
    }

    console.log('collected', collected.values)
  } catch (error) {
    console.log('error', error)
  }
}
