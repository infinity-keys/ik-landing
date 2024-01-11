// Require the necessary discord.js classes
import * as fs from 'node:fs'
import * as path from 'node:path'

import { Client, Collection, GatewayIntentBits } from 'discord.js'
import mongoose from 'mongoose'

import { buttonHandler } from './lib/buttonHandler'
import { passcodeModal } from './lib/passcodeModal'
import { passcodeSubmit } from './lib/passcodeSubmit'
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
  if (interaction.isChatInputCommand()) return
  try {
    const puzzles = await Puzzle.find()

    // handler for button interactions (puzzle selection)
    if (
      interaction.isButton() &&
      !interaction.customId.startsWith('solve-') &&
      puzzles.some((puzzle) => puzzle.id === interaction.customId)
    ) {
      console.log('puzzleId1', interaction.customId)
      await buttonHandler(interaction, puzzles)
      return
    }
    // create a modal for passcode submission
    if (
      interaction.isButton() &&
      interaction.customId.startsWith('solve-') &&
      puzzles.some(
        (puzzle) => puzzle.id === interaction.customId.split('solve-')[1]
      )
    ) {
      console.log('puzzleId2', interaction.customId)
      await passcodeModal(interaction, puzzles)
      return
    }

    // handler for modal submission (passcode verification)
    if (interaction.isModalSubmit()) {
      console.log('puzzleId3', interaction.customId)
      await passcodeSubmit(interaction)
      return
    }
  } catch (error) {
    console.log(error)
  }
})
