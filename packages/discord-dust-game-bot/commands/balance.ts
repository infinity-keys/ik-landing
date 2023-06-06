const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

const eco = require('../ecoDB')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription(
      'Gracefully inquire whether Archivist Nebo has the records of your page collection efforts at hand.'
    ),
  async execute(interaction) {
    const { guild, member } = interaction
    const balance = await eco.balance.get(member.id, guild.id)
    // instance to show the name of user
    // const username = interaction.user.username;

    const embedBalance = new EmbedBuilder()
      .setThumbnail(
        'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_delicate_bronze_magical_device_25c84ccf-8591-43cd-9aef-e14ce4d678f5_1_whkopj.png'
      )
      .setDescription(
        `I’m sure you’ve been working hard. Let me collect those files… According to the records you’ve located \`${balance}\` pages. Is that all? Well then.`
      )
      .setColor('c3b4f7')
    return interaction.reply({ embeds: [embedBalance] })
  },
}
