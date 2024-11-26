const logger = require('../util/Logging.js');

const loggerMiddleware = (req, res, next) => {
    const { method, url } = req; // Extract HTTP method and URL
    const start = Date.now(); // Capture the start time

    // Ensure that the 'finish' event is only registered once per request
    res.once('finish', () => {
        const duration = Date.now() - start; // Calculate duration
        const { statusCode } = res; // Extract status code

        // Log the HTTP request details
        logger.info({
            message: 'HTTP Request',
            method,
            url,
            statusCode,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        });
    });

    next();
};

module.exports = loggerMiddleware;
