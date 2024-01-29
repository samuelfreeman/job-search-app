const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const config = require('config');

// Define the log format for Winston
const logFormat = winston.format.combine(
  winston.format.colorize(), // Add colorization for console output
  winston.format.timestamp(), // Add timestamp to log entries
  winston.format.align(), // Align log entries
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}:${info.message}`,
  ), // Define the log entry format
);

// Create a new Daily Rotate File transport for Winston
const transport = new DailyRotateFile({
  filename: config.get('logConfig.logFolder') + config.get('logConfig.logFile'), // Specify the log file path and name
  datePattern: 'YYYY-MM-DD-HH', // Specify the date pattern for log rotation
  zippedArchive: false, // Disable log file compression
  maxSize: "'20m", // Specify the maximum size for log files
  maxFiles: '14d', // Specify the maximum number of days to keep log files
  level: config.get('logConfig.logLevel'), // Set the log level based on the configuration
});

// Create a Winston logger instance
const logger = winston.createLogger({
  format: logFormat, // Set the log format
  transports: [
    transport, // Add the Daily Rotate File transport
    new winston.transports.Console({
      level: 'info', // Set the log level for the console
    }),
  ],
});

// Export the logger for use in other parts of the application
module.exports = logger;
