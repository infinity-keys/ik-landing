import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js'

export async function buttonHandler(interaction, puzzles) {
  const selectedPuzzle = puzzles.find(
    (puzzle) => puzzle.id === interaction.customId
  )

  if (!selectedPuzzle) {
    await interaction.reply('Cannot find puzzle with that title')
    return
  }

  const embedMessage = new EmbedBuilder()
    .setDescription(
      `**Title:** ${selectedPuzzle.title}\n**Text:** ${selectedPuzzle.text}`
    )
    .setColor(0xc3b4f7)

  const currentRow = new ActionRowBuilder<ButtonBuilder>()

  currentRow.addComponents(
    new ButtonBuilder()
      .setCustomId(`solve-${selectedPuzzle.id}`)
      .setLabel('Solve')
      .setStyle(ButtonStyle.Primary)
  )
  try {
    const embedMessageWithImage = new EmbedBuilder()
      .setDescription(
        `**Title:** ${selectedPuzzle.title}\n**Text:** ${selectedPuzzle.text}`
      )
      .setColor(0xc3b4f7)
    const embedImage = selectedPuzzle.image
      ? embedMessageWithImage.setImage(selectedPuzzle.image)
      : embedMessageWithImage
    await interaction.reply({
      embeds: [embedImage],
      components: [currentRow],
    })
    return
  } catch (error) {
    if (error.message.includes('Not a well formed URL')) {
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
