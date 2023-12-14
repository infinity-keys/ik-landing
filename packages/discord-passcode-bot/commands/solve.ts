import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

import { Puzzle } from '../models/puzzle'

export const data = new SlashCommandBuilder()
  .setName('solve')
  .setDescription('enter the answer to puzzle')
  .addStringOption((option) =>
    option
      .setName('passcode')
      .setDescription('the passcode for the selected puzzle')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('title').setDescription('name of puzzle').setRequired(true)
  )

export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  const passcode = interaction.options.get('passcode').value
  const title = interaction.options.get('title').value

  const puzzle = await Puzzle.findOne({ title })

  if (!puzzle) {
    return await interaction.reply('Cannot find puzzle with that title')
  }

  await interaction.reply(
    `${puzzle.passcode === passcode ? 'Solved!!' : "You're Wrong!!"}`
  )

  console.log('passcode', passcode)
}
