const CronJob = require('cron').CronJob
const Cron = require('./backup.js')

// AutoBackUp every week (at 00:00 on Sunday)
new CronJob(
  '* * * * *',
  function () {
    Cron.dbAutoBackUp()
    console.log('it works')
  },
  null,
  true,
  'America/New_York'
)
