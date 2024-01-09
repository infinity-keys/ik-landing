// Require the necessary discord.js classes
import * as fs from 'node:fs'
import * as path from 'node:path'

import {
  Client,
  Collection,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'
import mongoose from 'mongoose'

import { Puzzle } from './models/puzzle'

require('dotenv').config()
// set up to use config file, if needed
// const { token } = require('./config.json');
interface CustomClient extends Client {
  commands?: Collection<string, unknown>
}

// Create a new client instance
const { Guilds, GuildMessages, GuildMessageReactions } = GatewayIntentBits

const client = new Client({
  intents: [Guilds, GuildMessages, GuildMessageReactions],
})

const customClient: CustomClient = client

customClient.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    customClient.commands.set(command.data.name, command)
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}
// Log in to Discord with your client's token
client.login(process.env.token)

//Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB.')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

client.on('interactionCreate', async (interaction) => {
  console.log('it works two')

  try {
    const puzzles = await Puzzle.find()

    // handler for button interactions (puzzle selection)
    if (
      interaction.isButton() &&
      !interaction.customId.startsWith('solve-') &&
      puzzles.some((puzzle) => puzzle.id === interaction.customId)
    ) {
      const selectedPuzzle = puzzles.find(
        (puzzle) => puzzle.id === interaction.customId
      )
      console.log('it works three')

      if (!selectedPuzzle) {
        await interaction.reply('Cannot find puzzle with that title')
        return
      }

      const embedMessage = new EmbedBuilder()
        .setDescription(
          `**Title:** ${selectedPuzzle.title}\n**Text:** ${selectedPuzzle.text}`
        )
        .setColor(0xc3b4f7)

      // const rows = []
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
        console.log(error.message.includes('Not a well formed URL'))
        if (error.message.includes('Not a well formed URL')) {
          await interaction.reply({
            embeds: [embedMessage],
            components: [currentRow],
          })
          return
        }

        await interaction.reply({
          content: 'something went wrong two',
          ephemeral: true,
        })
        return
      }
    }

    if (
      interaction.isButton() &&
      interaction.customId.startsWith('solve-') &&
      puzzles.some(
        (puzzle) => puzzle.id === interaction.customId.split('solve-')[1]
      )
    ) {
      // create a modal for passcode submission
      const selectedPuzzle = puzzles.find(
        (puzzle) => puzzle.id === interaction.customId.split('solve-')[1]
      )
      const modal = new ModalBuilder()
        .setCustomId('passcodeModal-' + selectedPuzzle.id) // Unique ID for the modal
        .setTitle('Enter Passcode')
      const passcodeInput = new TextInputBuilder()
        .setCustomId('passcodeInput')
        .setLabel(`Enter passcode for ${selectedPuzzle.title}`)
        .setStyle(TextInputStyle.Short)
      const firstActionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(passcodeInput)
      modal.addComponents(firstActionRow)
      await interaction.showModal(modal)
      return
    }

    // handler for modal submission (passcode verification)
    if (interaction.isModalSubmit()) {
      const passcode = interaction.fields.getTextInputValue('passcodeInput')
      const puzzleId = interaction.customId.split('solve-')[1] // Extract puzzle ID from the custom ID

      // Here you would verify the passcode, perhaps checking against a value in your database
      const puzzle = await Puzzle.findOne({ id: puzzleId })

      if (!puzzle) {
        await interaction.reply('Cannot find puzzle with that title')
        return
      }

      await interaction.reply(
        `${puzzle.passcode === passcode ? 'Solved!!' : "You're Wrong!!"}`
      )
      return
    }
  } catch (error) {
    console.log(error)
  }
})
