import { ObjectId } from 'mongodb'

import { Puzzle } from '../models/puzzle'

export async function passcodeSubmit(interaction) {
  const passcode = interaction.fields.getTextInputValue('passcodeInput')
  // console.log('interaction', interaction)
  console.log('passcode', passcode)
  // Extract puzzle ID from the custom ID
  const puzzleId = interaction.customId.split('passcodeModal-')[1]
  console.log('puzzleId4', puzzleId)
  console.log('interactionID', interaction.customId)

  // Here you would verify the passcode, perhaps checking against a value in your database
  const puzzle = await Puzzle.findOne({ _id: new ObjectId(puzzleId) })
  console.log('puzzle', puzzle)

  if (!puzzle) {
    await interaction.reply('Cannot find puzzle with that title')
    return
  }

  await interaction.reply(
    `${
      puzzle.passcode === passcode
        ? 'Puzzle solved. Well done.'
        : "That's incorrect. Try, try again."
    }`
  )
}
