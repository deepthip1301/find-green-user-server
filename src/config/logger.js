const winston = require('winston')
require('winston-daily-rotate-file')
const root = require('app-root-path')
const config = require('./config')

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

const { combine, timestamp, printf } = winston.format
// const logLevel = config.log.level;

const logFile = `${root.path}/log/`

const logFormat = printf((detail) => `${detail.timestamp} ${detail.level}: ${detail.message}\n`)

// var transport =

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(timestamp(),
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    logFormat),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    }),
    new winston.transports.DailyRotateFile({
      filename: `${logFile + config.log.file}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '1G',
      maxFiles: '14d'
    }),
    new winston.transports.DailyRotateFile({
      filename: `${logFile + config.log.errorFile}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '1G',
      maxFiles: '14d',
      level: 'error'
    })

  ]
})

logger.stream = {
  write (message) {
    logger.info(message.substring(0, message.lastIndexOf('\n')))
  }
}

// const logger = winston.createLogger({
//   level: config.env === 'development' ? 'debug' : 'info',
//   format: winston.format.combine(
//     enumerateErrorFormat(),
//     config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
//     winston.format.splat(),
//     winston.format.printf(({ level, message }) => `${level}: ${message}`)
//   ),
//   transports: [
//     new winston.transports.Console({
//       stderrLevels: ['error'],
//     }),
//     // Error log File Name
//     new winston.transports.File({
//       filename: 'error.log',
//       datePattern: 'YYYY-MM-DD',
//       zippedArchive: false,
//       maxSize: '1G',
//       maxFiles: '14d',
//       level: 'error'
//     }),
//     new winston.transports.File({
//       filename: 'combined.log',
//       datePattern: 'YYYY-MM-DD',
//       zippedArchive: false,
//       maxSize: '1G',
//       maxFiles: '14d',
//     }),
//   ],
// });

module.exports = logger
