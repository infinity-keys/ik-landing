import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

import { Puzzle } from '../models/puzzle'
import { User } from '../models/user'

export const data = new SlashCommandBuilder()
  .setName('create')
  .setDescription('create your puzzle')
  .addStringOption((option) =>
    option
      .setName('passcode')
      .setDescription('enter in passcode')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('text')
      .setDescription('enter in quest text')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('title').setDescription('name of puzzle').setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('image').setDescription('image for puzzle')
  )

export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  const message = interaction.options
  const image = message.get('image')?.value
  if (image && !isValidHttpUrl(image)) {
    await interaction.reply({
      content: `Please enter in valid image url`,
      ephemeral: true,
    })
    return
  }

  const user = await User.findOneAndUpdate(
    { discordId: interaction.user.id },
    { username: interaction.user.username, discordId: interaction.user.id },
    { upsert: true, new: true }
  )

  const puzzle = new Puzzle({
    title: message.get('title').value,
    text: message.get('text').value,
    passcode: message.get('passcode').value,
    image: image && isValidHttpUrl(image) ? image : undefined,
    creator: user,
  })
  await puzzle.save()

  await interaction.reply({
    content: `you're all set`,
    ephemeral: true,
  })
}

function isValidHttpUrl(string) {
  let url

  try {
    url = new URL(string)
  } catch {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
