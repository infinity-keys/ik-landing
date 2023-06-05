const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10')
const { EmbedBuilder } = require('discord.js')

const eco = require('../ecoDB')
const { options } = require('../ecoDB')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('results')
    .setDescription(
      'Announcing the winner of the current cycle and resetting balances to zero'
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const { guild } = interaction
    const leaderboard = await eco.balance.leaderboard(guild.id, options)

    const results = new EmbedBuilder()
      .setThumbnail(
        'https://res.cloudinary.com/infinity-keys/image/upload/v1683748067/discord-bot/Copy_of_leaderboard_winner_-_magic_httpss.mj.runq1PSMGF-tR4_400193d2-565a-4814-8b9c-2fa2f24eb08a_bj31o8.png'
      )
      .setDescription(
        `Attention seekers! The winner of this cycle’s archivist collections is <@${leaderboard[0].userID}>. Let us all strive to follow in the footsteps of this achievement, and perhaps, if it is not beyond your ability, one of you may surpass these acceptable results.

        <@${leaderboard[0].userID}> you have been appointed to the Curator’s Council, and now possess the rights and responsibilities that accompany the title. Be wise, and on your guard.
        `
      )
      .setColor('c3b4f7')
    return interaction.reply({ embeds: [results] })
  },
}
