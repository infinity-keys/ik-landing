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
    // const now = new Date()
    // const dateString = now.toLocaleDateString().replaceAll('/', '-')
    // const filename = `db_backup_${dateString}`
    // console.log(filename)

    const sourceCollection = client.db('test').collection('database')
    const targetCollection = client.db('test').collection('backup')

    await sourceCollection
      .aggregate([{ $match: {} }, { $out: targetCollection.collectionName }])
      .toArray()

    return interaction.reply('it works')
  },
}
