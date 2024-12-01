const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Log level: 'info', 'warn', 'error', etc.
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Format logs as JSON
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/app.log' }) // Log to a file
    ]
});

module.exports = logger;