import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

import { eco } from '../ecoDB'

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

  const filter = (reaction) => {
    return reaction.emoji.name === '👍🏾'
  }

  const collected = await message.awaitReactions({
    filter,
    max: 5,
    time: 30000,
  })

  for (const reaction of collected.values()) {
    const users = reaction.users.cache.map((user) => user.id)
    for (const userId of users) {
      await eco.balance.add(10, userId, guild.id)
    }
  }
}
