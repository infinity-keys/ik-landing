import { Interaction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Provides information about the user.')
export async function execute(interaction: Interaction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  // interaction.user is the object representing the User who ran the command

  await interaction.reply(
    `This command was run by ${interaction.user.username}, who joined on ${interaction.user.createdAt}.`
  )
}
