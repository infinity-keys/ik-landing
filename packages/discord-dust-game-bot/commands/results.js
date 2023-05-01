const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

const eco = require('../ecoDB')
const { options } = require('../ecoDB')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('results')
    .setDescription(
      'Announcing the winner of the current cycle and resetting balances to zero'
    ),
  async execute(interaction) {
    const { guild } = interaction

    const leaderboard = await eco.balance.leaderboard(guild.id, options)

    const results = new EmbedBuilder()
      .setThumbnail(
        'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_profile_perspective_anime_style_black_person_older_person_761cd5e0-ea63-45e2-8287-5ee14cdf715d_xavztp.png'
      )
      .setDescription(
        `The winner is, <@${leaderboard[0].userID}>. The new cycle`
      )
      .setColor('c3b4f7')
    return interaction.reply({ embeds: [results] })
  },
}
