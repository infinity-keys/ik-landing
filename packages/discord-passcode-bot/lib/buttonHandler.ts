import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js'

export async function buttonHandler(interaction, puzzles) {
  const selectedPuzzle = await puzzles
    .find((puzzle) => puzzle.id === interaction.customId)
    .populate('creator')

  if (!selectedPuzzle) {
    await interaction.reply('Cannot find puzzle with that title')
    return
  }

  const currentRow = new ActionRowBuilder<ButtonBuilder>()

  currentRow.addComponents(
    new ButtonBuilder()
      .setCustomId(`solve-${selectedPuzzle.id}`)
      .setLabel('Solve')
      .setStyle(ButtonStyle.Success)
  )
  try {
    const embedMessage = new EmbedBuilder()
      .setDescription(
        `**Title:** ${selectedPuzzle.title}\n**Text:** ${selectedPuzzle.text}\n**Creator:** <@${selectedPuzzle.creator.discordId}>`
      )
      .setColor(0xc3b4f7)
    const embedImage = selectedPuzzle.image
      ? embedMessage.setImage(selectedPuzzle.image)
      : embedMessage
    await interaction.reply({
      embeds: [embedImage],
      components: [currentRow],
    })
    return
  } catch (error) {
    if (error.message.includes('Not a well formed URL')) {
      const embedMessage = new EmbedBuilder()
        .setDescription(
          `**Title:** ${selectedPuzzle.title}\n**Text:** ${selectedPuzzle.text}`
        )
        .setColor(0xc3b4f7)
      await interaction.reply({
        embeds: [embedMessage],
        components: [currentRow],
      })
      return
    }

    await interaction.reply({
      content: 'something went wrong',
      ephemeral: true,
    })
  }
}
