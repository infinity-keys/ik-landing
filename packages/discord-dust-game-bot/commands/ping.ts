import { SlashCommandBuilder } from 'discord.js'
import { Interaction } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!')

export async function execute(interaction: Interaction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  await interaction.reply({
    content: `Pong!`,
    fetchReply: true,
  })
}
