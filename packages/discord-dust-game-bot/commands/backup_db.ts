import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

const { PermissionFlagsBits } = require('discord-api-types/v10')
const { SlashCommandBuilder } = require('discord.js')
const { MongoClient } = require('mongodb')

const mongoUri = process.env.MONGO_URL
const client = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = {
  data: new SlashCommandBuilder()
    .setName('backup')
    .setDescription('copies collection into a new collection')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
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
  },
}
