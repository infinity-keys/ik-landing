import { buttonHandler } from '../lib/buttonHandler'
import { passcodeModal } from '../lib/passcodeModal'
import { passcodeSubmit } from '../lib/passcodeSubmit'
import { Puzzle } from '../models/puzzle'

const { Events } = require('discord.js')

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName)

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        )
        return
      }

      try {
        return await command.execute(interaction)
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`)
        console.error(error)
      }
    }
    if (interaction.isButton()) {
      // handler for button interactions (puzzle selection)
      try {
        const puzzles = await Puzzle.find()
        if (
          !interaction.customId.startsWith('solve-') &&
          puzzles.some((puzzle) => puzzle.id === interaction.customId)
        ) {
          await buttonHandler(interaction, puzzles)
          return
        }

        // create a modal for passcode submission
        if (
          interaction.customId.startsWith('solve-') &&
          puzzles.some(
            (puzzle) => puzzle.id === interaction.customId.split('solve-')[1]
          )
        ) {
          await passcodeModal(interaction, puzzles)
          return
        }
      } catch (error) {
        console.log('error in button', error)
      }
    }
    // handler for modal submission (passcode verification)
    if (interaction.isModalSubmit()) {
      try {
        await passcodeSubmit(interaction)
        return
      } catch (error) {
        console.log('error in modal', error)
      }
    }
  },
}
