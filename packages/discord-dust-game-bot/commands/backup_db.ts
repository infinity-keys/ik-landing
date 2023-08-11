import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { PermissionFlagsBits } from 'discord-api-types/v10'
import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { MongoClient } from 'mongodb'

const mongoUri = process.env.MONGO_URL
const client = new MongoClient(mongoUri)

export const data = new SlashCommandBuilder()
  .setName('backup')
  .setDescription('copies collection into a new collection')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function execute(interaction: CommandInteraction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }

  const now = new Date()
  const dateInWords = format(now, 'LLLL-dd-yyyy', { locale: enUS })

  // Remove any special characters or spaces from the date in words
  const sanitizedDateInWords = dateInWords.replace(/[^\w]/g, '')
  const filename = `${sanitizedDateInWords}`

  const sourceCollection = client.db('test').collection('database')
  const targetCollection = client.db('test').collection(`${filename}`)

  await sourceCollection
    .aggregate([{ $match: {} }, { $out: targetCollection.collectionName }])
    .toArray()

  return interaction.reply('it works')
}
