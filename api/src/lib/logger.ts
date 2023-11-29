import datadog from 'pino-datadog'

import { createLogger } from '@redwoodjs/api/logger'

/**
 * Creates a logger with RedwoodLoggerOptions
 *
 * These extend and override default LoggerOptions,
 * can define a destination like a file or other supported pino log transport stream,
 * and sets whether or not to show the logger configuration settings (defaults to false)
 *
 * @param RedwoodLoggerOptions
 *
 * RedwoodLoggerOptions have
 * @param {options} LoggerOptions - defines how to log, such as redaction and format
 * @param {string | DestinationStream} destination - defines where to log, such as a transport stream or file
 * @param {boolean} showConfig - whether to display logger configuration on initialization
 */

export const stream = datadog.createWriteStreamSync({
  apiKey: process.env.DATADOG_API_KEY || '',
  ddsource: 'ik-redwood',
  service: 'ik-redwood',
  size: 1,
})

export const logger = createLogger({
  ...(process.env.NODE_ENV === 'production'
    ? {
        destination: stream,
        options: { level: 'info' },
      }
    : {
        options: { level: 'warn' },
      }),
})
