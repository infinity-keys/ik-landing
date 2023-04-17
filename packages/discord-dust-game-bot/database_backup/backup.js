/* eslint-disable no-empty-function */
/* eslint-disable prettier/prettier */
const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const _ = require('lodash')

// Concatenate root directory path with our backup folder.
const backupDirPath = path.join(__dirname)
console.log('backupdirpath', backupDirPath)
console.log('dirname', __dirname)

const dbOptions = {
  user: 'root',
  pass: 'rootpassword',
  host: 'mongodb://root:rootpassword@127.0.0.1',
  port: 27017,
  database: 'test',
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: backupDirPath,
}

// return stringDate as a date object.
exports.stringToDate = (dateString) => {
  return new Date(dateString)
}

// Check if variable is empty or not.
exports.empty = (mixedVar) => {
  let undef, key, i, len
  const emptyValues = [undef, null, false, 0, '', '0']
  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      return false
    }
    return true
  }
  return false
}

// Auto backup function
exports.dbAutoBackUp = () => {
  console.log('dbauto')

  // check for auto backup is enabled or disabled
  if (dbOptions.autoBackup == true) {
    const date = new Date()
    let beforeDate, oldBackupDir, oldBackupPath

    // Current date
    const currentDate = this.stringToDate(date)
    const newBackupDir =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate()

    console.log('newbackupdir', newBackupDir)

    // New backup path for current backup process
    const newBackupPath =
      dbOptions.autoBackupPath + '-mongodump-' + newBackupDir
    // check for remove old backup after keeping # of days given in configuration

    console.log('newbackuppath', newBackupPath)

    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate)
      // Substract number of days to keep backup and remove old backup
      beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup)
      oldBackupDir =
        beforeDate.getFullYear() +
        '-' +
        (beforeDate.getMonth() + 1) +
        '-' +
        beforeDate.getDate()
      // old backup(after keeping # of days)
      oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir

      console.log('oldbackupdir', oldBackupDir)
      console.log('oldbackuppath', oldBackupPath)
    }

    // Command for mongodb dump process
    const cmd =
      'mongodump --host=' +
      dbOptions.host +
      ' --port=' +
      dbOptions.port +
      ' --db=' +
      dbOptions.database +
      ' --username=' +
      dbOptions.user +
      ' --password=' +
      dbOptions.pass +
      ' --out=' +
      newBackupPath

    console.log('cmd', cmd)

    exec(cmd, (error, _stdout, _stderr) => {
      console.log('exec')
      if (this.empty(error)) {
        // check for remove old backup after keeping # of days given in configuration.
        console.log('error', error)
        if (dbOptions.removeOldBackup == true) {
          if (fs.existsSync(oldBackupPath)) {
            exec('rm -rf ' + oldBackupPath, (_err) => {})
          }
        }
      }
    })
  }
}
