import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  MessageReaction,
} from 'discord.js'

import { eco } from '../ecoDB'
require('dotenv').config()

export const data = new SlashCommandBuilder()
  .setName('weekly')
  .setDescription(
    "Embark on a weekly exploration for pages far into the Infinite Library's deepest & darkest sections."
  )
export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }

  const { guild, member } = interaction
  const weekly = await eco.rewards.getWeekly(member.user.id, guild.id)
  // instance to show cooldown time
  // const time = eco.rewards.getWeekly(member.id, guild.id).cooldown.pretty;

  if (!weekly.claimed) {
    const embedNoWeekly = new EmbedBuilder()
      .setThumbnail(
        'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_smirking_9fc26f86-8639-4f0f-85bf-dccb01f80fe2_ieqyuy.png'
      )
      .setDescription(
        "Back so soon? You know, these efforts can be challenging, especially for those not fit for...intellectual labors.Never mind. Return next week when you've managed to rest your weary little mind."
      )
      .setColor(0xc3b4f7)
    // return interaction.reply({ embeds: [embedNoWoeekly] })
    const message = await interaction.reply({
      embeds: [embedNoWeekly],
      fetchReply: true,
    })

    const filter = (reaction: MessageReaction) => {
      return (
        reaction.emoji.id === process.env.EMOJI_REACTION_IK_ID ||
        reaction.emoji.id === '1065285126935805962' ||
        reaction.emoji.id === '1106277546498199602' ||
        reaction.emoji.id === '1083028535314239610' ||
        reaction.emoji.id === '1083028536568320111'
      )
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

  const embedWeekly = new EmbedBuilder()
    .setThumbnail(
      'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_fancy_elderly_black_gentleman_organizing_pages_in_a_libra_45a0d5d4-302c-47cd-a671-b46cbd6ad0b9_h3jqjs.png'
    )
    .setDescription(
      `Welcome back, friend. Did you discover delights...or horrors? \`${weekly.reward} pages 📜\`? Well done indeed. Your efforts continue to play an integral role in the Society's research. I don't often indulge, but perhaps a bit of chocolate to celebrate this exemplary feat.`
    )
    .setColor(0xc3b4f7)
  return interaction.reply({ embeds: [embedWeekly] })
}
