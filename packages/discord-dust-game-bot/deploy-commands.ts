const fs = require('node:fs')
const path = require('path')

const { REST, Routes } = require('discord.js')
// set up if you want to use a config file instead
// const { clientId, guildId, token } = require('./config.json');
require('dotenv').config()
const { clientId, guildId, token } = process.env

const commands = []
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  commands.push(command.data.toJSON())
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token)

// and deploy your commands!
;(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    )

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
    return
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
    return
  }
})()
