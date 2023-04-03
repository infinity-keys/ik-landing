const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')
const eco = require('../ecoDB')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weekly')
    .setDescription(
      "Embark on a weekly exploration for pages far into the Infinite Library's deepest & darkest sections."
    ),
  async execute(interaction) {
    const { guild, member } = interaction
    const weekly = await eco.rewards.getWeekly(member.id, guild.id)
    // instance to show cooldown time
    // const time = eco.rewards.getWeekly(member.id, guild.id).cooldown.pretty;

    if (!weekly.claimed) {
      const embedNoWoeekly = new EmbedBuilder()
        .setThumbnail(
          'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_smirking_9fc26f86-8639-4f0f-85bf-dccb01f80fe2_ieqyuy.png'
        )
        .setDescription(
          "Back so soon? You know, these efforts can be challenging, especially for those not fit for...intellectual labors.Never mind. Return next week when you've managed to rest your weary little mind."
        )
        .setColor('c3b4f7')
      return interaction.reply({ embeds: [embedNoWoeekly] })
    }

    const embedWeekly = new EmbedBuilder()
      .setThumbnail(
        'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_fancy_elderly_black_gentleman_organizing_pages_in_a_libra_45a0d5d4-302c-47cd-a671-b46cbd6ad0b9_h3jqjs.png'
      )
      .setDescription(
        `Welcome back, friend. Did you discover delights...or horrors? \`${weekly.reward} pages 📜\`? Well done indeed. Your efforts continue to play an integral role in the Society's research. I don't often indulge, but perhaps a bit of chocolate to celebrate this exemplary feat.`
      )
      .setColor('c3b4f7')
    return interaction.reply({ embeds: [embedWeekly] })
  },
}
