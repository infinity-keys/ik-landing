import { PermissionFlagsBits } from 'discord-api-types/v10'
import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { EmbedBuilder } from 'discord.js'

import { eco } from '../ecoDB'

export const data = new SlashCommandBuilder()
  .setName('reset')
  .setDescription("resets the leaderboard and user's balances to zero")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  const { guild, member } = interaction
  const ecoUsers = await eco.users.all(member.user.id, guild.id)
  console.log('users', ecoUsers)
  for (const ecoUser of ecoUsers) {
    await eco.database.delete(`${ecoUser.guildID}.${ecoUser.id}`)
  }
  const embedReset = new EmbedBuilder()
    .setThumbnail(
      'https://res.cloudinary.com/infinity-keys/image/upload/v1683748225/discord-bot/reset_-_magic_elderly_black_gentleman_in_fancy_clothes_at_a_podium_spea_9df0f76e-9bf8-4ab7-a425-3b94810c653c_yhws7y.png'
    )
    .setDescription(
      'The cycle has ended. All of your pages have been reset to zero and the leaderboard has been cleared. We at the archives appreciate your work, and encourage you to, ahem, not let your trifling efforts of the past be an indicator of your future work.'
    )
    .setColor(0xc3b4f7)
  return interaction.reply({ embeds: [embedReset] })
}

// command to delete a user's balance
// await eco.database.delete(`${guildID}.${memberID}.money`)
