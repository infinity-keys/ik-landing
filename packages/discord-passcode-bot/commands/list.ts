import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

import { Puzzle } from '../models/test'

// const yourArray = ['Puzzle1', 'Puzzle2', 'Puzzle3'] // Replace with your array

export const data = new SlashCommandBuilder()
  .setName('list')
  .setDescription('a list of all current puzzles')

export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }

  const puzzles = await Puzzle.find()

  await interaction.reply({
    content: puzzles.map(({ title }) => title).join('\n'),
    fetchReply: true,
  })
}
