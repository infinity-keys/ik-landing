const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

const { options } = require('../ecoDB')
const eco = require('../ecoDB')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription(
      'Politely request that Archivist Nebo retrieve the records of The Society’s top archival researchers.'
    ),
  async execute(interaction) {
    const { guild } = interaction
    const leaderboard = await eco.balance.leaderboard(guild.id, options)
    const username = interaction.user.username
    // set up to show server's name
    // const name = interaction.member.guild.name;

    if (!leaderboard.length) {
      const embedNoLeader = new EmbedBuilder()
        .setThumbnail(
          'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_over_the_shoulder_perspective_fb191578-6223-4bb8-8044-628f74273b5a_iatatt.png'
        )
        .setDescription(`${username}, there are no users on the leaderboard`)
        .setColor('c3b4f7')
      return interaction.reply({ embeds: [embedNoLeader] })
    }

    const embedLeader = new EmbedBuilder()
      .setThumbnail(
        'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_holding_many_papers_568e8a4f-dc1c-4a99-8680-0b964e60326f_djytzu.png'
      )
      .setTitle('Records? Yes of course.')
      .setDescription(
        `${leaderboard
          .slice(0, 20)
          .map(
            (lb, index) =>
              `${index + 1} - <@${lb.userID}> - **${lb.money}** pages`
          )
          .join('\n')}`
      )
      .setColor('c3b4f7')
    return interaction.reply({ embeds: [embedLeader] })
  },
}
