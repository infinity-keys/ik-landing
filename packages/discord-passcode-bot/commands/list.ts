import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js'

import { Puzzle } from '../models/puzzle'

export const data = new SlashCommandBuilder()
  .setName('list')
  .setDescription('a list of all current puzzles')

export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }

  const puzzles = await Puzzle.find()

  // handler for creation of buttons

  const rows = []
  let currentRow = new ActionRowBuilder<ButtonBuilder>()

  puzzles.forEach((puzzle, index) => {
    if (index !== 0 && index % 5 === 0) {
      rows.push(currentRow)
      currentRow = new ActionRowBuilder<ButtonBuilder>()
    }
    currentRow.addComponents(
      new ButtonBuilder()
        .setCustomId(puzzle.id)
        .setLabel(puzzle.title)
        .setStyle(ButtonStyle.Primary)
    )
  })

  if (currentRow.components.length > 0) {
    rows.push(currentRow)
  }

  await interaction.reply({ content: 'Choose a puzzle:', components: rows })

  // await interaction.reply({
  //   content: puzzles.map(({ title }) => title).join('\n'),
  //   fetchReply: true,
  // })
}
