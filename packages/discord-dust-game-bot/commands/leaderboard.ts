import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, MessageReaction, EmbedBuilder } from 'discord.js'

import { eco } from '../ecoDB'
require('dotenv').config()

export const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription(
    'Politely request that Archivist Nebo retrieve the records of The Society’s top archival researchers.'
  )
export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  const { guild } = interaction
  const leaderboard = await eco.balance.leaderboard(guild.id)
  const username = interaction.user.username
  // set up to show server's name
  // const name = interaction.member.guild.name;

  if (!leaderboard.length) {
    const embedNoLeader = new EmbedBuilder()
      .setThumbnail(
        'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_over_the_shoulder_perspective_fb191578-6223-4bb8-8044-628f74273b5a_iatatt.png'
      )
      .setDescription(`${username}, there are no users on the leaderboard`)
      .setColor(0xc3b4f7)
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
    .setColor(0xc3b4f7)
  const message = await interaction.reply({
    embeds: [embedLeader],
    fetchReply: true,
  })

  const filter = (reaction: MessageReaction) => {
    return reaction.emoji.id === process.env.EMOJI_REACTION_IK_ID
  }

  try {
    const collected = await message.awaitReactions({
      filter,
      time: 45000,
    })

    for (const reaction of collected.values()) {
      const users = reaction.users.cache.map((user) => user.id)

      for (const userId of users) {
        if (interaction.user.id !== userId) {
          await eco.balance.add(1, userId, guild.id)
        }
      }
    }
  } catch (error) {
    console.log('error', error)
  }
}
