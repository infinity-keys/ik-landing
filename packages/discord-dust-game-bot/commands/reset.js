const { SlashCommandBuilder } = require('discord.js')

const eco = require('../ecoDB')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription("resets the leaderboard and player's balances to zero"),
  async execute(interaction) {
    const { guild, member } = interaction
    const ecoUsers = await eco.users.all()
    console.log('ecoUsers', ecoUsers)

    for (const ecoUser of ecoUsers) {
      // await eco.database.delete(`${ecoUser.guildID}.${ecoUser.id}`)
      const test = await eco.database.find(`${ecoUser.guildID}.${ecoUser.id}`)
      console.log(test)
    }
    await interaction.reply('All progress has been reset. We start at zero')
  },
}
// command to delete a user's balance
// await eco.database.delete(`${guildID}.${memberID}.money`)
