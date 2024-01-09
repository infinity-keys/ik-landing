import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js'

import { Puzzle } from '../models/puzzle'

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('select a puzzle')
  .addStringOption((option) =>
    option.setName('title').setDescription('enter in title').setRequired(true)
  )

export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }

  const title = interaction.options.get('title').value
  const puzzle = await Puzzle.findOne({ title })

  if (!puzzle) {
    return await interaction.reply('Cannot find puzzle with that title')
  }

  const embedBalance = new EmbedBuilder()

    .setDescription(`**Title:** ${puzzle.title}\n**Text:** ${puzzle.text}`)
    .setColor(0xc3b4f7)
  const embedImage = puzzle.image
    ? embedBalance.setImage(puzzle.image)
    : embedBalance
  return interaction.reply({ embeds: [embedImage] })
}
