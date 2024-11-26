const logger = require('../util/Logging.js');

const loggerMiddleware = (req, res, next) => {
    const { method, url } = req; // Extract HTTP method and URL
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;

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