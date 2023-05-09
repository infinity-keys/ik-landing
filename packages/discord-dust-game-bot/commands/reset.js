const { PermissionFlagsBits } = require('discord-api-types/v10')
const { SlashCommandBuilder } = require('discord.js')

const eco = require('../ecoDB')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription("resets the leaderboard and player's balances to zero")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const ecoUsers = await eco.users.all()
    for (const ecoUser of ecoUsers) {
      await eco.database.delete(`${ecoUser.guildID}.${ecoUser.id}`)
    }
    return interaction.reply('All progress has been reset. We start at zero')
  },
}

// command to delete a user's balance
// await eco.database.delete(`${guildID}.${memberID}.money`)
