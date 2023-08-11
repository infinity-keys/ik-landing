// Require the necessary discord.js classes
import * as fs from 'node:fs'
import * as path from 'node:path'

import { Client, Collection, GatewayIntentBits } from 'discord.js'

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
