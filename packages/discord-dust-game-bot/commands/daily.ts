import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, EmbedBuilder } from 'discord.js'

import { eco } from '../ecoDB'

export const data = new SlashCommandBuilder()
  .setName('daily')
  .setDescription(
    'Conduct a daily delve for pages within the deeper mysteries of the Infinite Library'
  )
export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  const { guild, member } = interaction
  const daily = await eco.rewards.getDaily(member.user.id, guild.id)
  // instance to show cooldown time
  // const time = eco.rewards.getDaily(member.id, guild.id).cooldown.pretty;

  if (!daily.claimed) {
    const embedNoDaily = new EmbedBuilder()
      .setThumbnail(
        'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_profile_perspective_anime_style_black_person_older_person_761cd5e0-ea63-45e2-8287-5ee14cdf715d_xavztp.png'
      )
      .setDescription(
        "Oh dear, all that time...for nothing. Well, there's always tomorrow.  In the meantime, why don’t you take a cup of tea...elsewhere."
      )
      .setColor(0xc3b4f7)
    return interaction.reply({ embeds: [embedNoDaily] })
  }

  const embedDaily = new EmbedBuilder()
    .setThumbnail(
      'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_far_shot_angle_anime_style_black_person_older_person_occu_e90c7a75-60da-4076-a367-992a0a87f3f1_t0djmd.png'
    )
    .setDescription(
      `Ah, one of my two favorite times of the day—when you return from a deep search of the library and bring back many pages.  Today you collected \`${daily.reward} pages 📜\`, splendid!  The other is of course, tea time. Cheers...`
    )
    .setColor(0xc3b4f7)
  return interaction.reply({ embeds: [embedDaily] })
}
