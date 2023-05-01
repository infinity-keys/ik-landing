const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

const eco = require('../ecoDB')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription(
      'Engage in a brief search within the library stacks for lost pages.'
    ),
  async execute(interaction) {
    const { guild, member } = interaction
    const work = await eco.rewards.getWork(member.id, guild.id)
    // instance to show cooldown time
    // const time = eco.rewards.getWork(member.id, guild.id).cooldown.pretty;

    console.log('work', work)
    console.log(work.claimed)

    if (!work.claimed) {
      const embedNoWork = new EmbedBuilder()
        .setThumbnail(
          'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_far_shot_angle_anime_style_black_person_older_person_occu_2dec9cc0-7feb-4f2b-9e2a-661042234d45_vsvgw3.png'
        )
        .setDescription(
          'Unfortunately, your search has not produced...ahem...results... Come back at the appropriate time to try the stacks again, perhaps you’ll feel a bit more refreshed.'
        )
        .setColor('c3b4f7')
      return interaction.reply({ embeds: [embedNoWork] })
    }

    const embedWork = new EmbedBuilder()
      .setThumbnail(
        'https://res.cloudinary.com/infinity-keys/image/upload/t_ik-nft-meta/discord-bot/magic_elderly_fancy_black_gentleman_reaching_for_a_blue_portal__88ecb1c0-e04c-432a-b375-82f263ab4262_rddhne.png'
      )
      .setDescription(
        `It appears that your search has not been in vain. I thank you my friend. You have collected \`${work.reward} pages 📜\`. Come back in another hour to seek within the stacks once more.`
      )
      .setColor('c3b4f7')
    return interaction.reply({ embeds: [embedWork] })
  },
}
