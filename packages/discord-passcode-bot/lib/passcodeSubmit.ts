import { ObjectId } from 'mongodb'

import { Puzzle } from '../models/puzzle'

export async function passcodeSubmit(interaction) {
  const passcode = interaction.fields
    .getTextInputValue('passcodeInput')
    .toLowerCase()
  // Extract puzzle ID from the custom ID
  const puzzleId = interaction.customId.split('passcodeModal-')[1]

  // Here you would verify the passcode, checking against a value in your database
  const puzzle = await Puzzle.findOne({ _id: new ObjectId(puzzleId) })

  if (!puzzle) {
    await interaction.reply('Cannot find puzzle with that title')
    return
  }

  puzzle.passcode.toLowerCase() === passcode
    ? await interaction.reply({
        content: `Puzzle solved. Well done <@${interaction.user.id}>.`,
        ephemeral: false,
      })
    : await interaction.reply({
        content: "That's incorrect. Try, try again.",
        ephemeral: true,
      })
}
