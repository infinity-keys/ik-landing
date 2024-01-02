import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

import { Puzzle } from '../models/puzzle'

export const data = new SlashCommandBuilder()
  .setName('create')
  .setDescription('create your puzzle')
  .addStringOption((option) =>
    option
      .setName('passcode')
      .setDescription('enter in passcode')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('text')
      .setDescription('enter in quest text')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('title').setDescription('name of puzzle').setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('image').setDescription('image for puzzle')
  )

export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  const message = interaction.options
  const puzzle = new Puzzle({
    title: message.get('title').value,
    text: message.get('text').value,
    passcode: message.get('passcode').value,
    image: message.get('image')?.value,
  })
  await puzzle.save()

  await interaction.reply({
    content: `you're all set`,
    fetchReply: true,
    ephemeral: true,
  })
}
