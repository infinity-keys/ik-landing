import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'

export async function passcodeModal(interaction, puzzles) {
  const selectedPuzzle = puzzles.find(
    (puzzle) => puzzle.id === interaction.customId.split('solve-')[1]
  )
  const modal = new ModalBuilder()
    // Unique ID for the modal
    .setCustomId('passcodeModal-' + selectedPuzzle.id)
    .setTitle('Enter Passcode')
  const passcodeInput = new TextInputBuilder()
    .setCustomId('passcodeInput')
    .setLabel(`Enter passcode for ${selectedPuzzle.title}`)
    .setStyle(TextInputStyle.Short)
  const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
    passcodeInput
  )
  modal.addComponents(firstActionRow)
  await interaction.showModal(modal)
}
