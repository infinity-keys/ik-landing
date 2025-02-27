import Economy from 'discord-economy-super/mongodb'
// const Economy = require('discord-economy-super')

const eco = new Economy({
  connection: {
    connectionURI: process.env.MONGO_URL,
    collectionName: 'database',
    dbName: 'test',
  },
  // needed to set up json db
  // storagePath: './storage.json',
  // updateCountdown: 1000,
  // checkStorage: true,
  deprecationWarnings: true,
  sellingItemPercent: 75,
  savePurchasesHistory: true,
  dailyAmount: [75, 125],
  workAmount: [10, 50],
  weeklyAmount: [750, 1200],
  dailyCooldown: 60000 * 60 * 24,
  workCooldown: 60000 * 60,
  weeklyCooldown: 60000 * 60 * 24 * 7,
  dateLocale: 'en',
  updater: {
    checkUpdates: true,
    upToDateMessage: true,
  },
  errorHandler: {
    handleErrors: true,
    attempts: 5,
    time: 3000,
  },
  optionsChecker: {
    ignoreInvalidTypes: false,
    ignoreUnspecifiedOptions: true,
    ignoreInvalidOptions: false,
    showProblems: true,
    sendLog: true,
    sendSuccessLog: false,
  },
})

eco.on('ready', async () => {
  console.log('Economy is ready!')
})
// module.exports = eco
export { eco }
