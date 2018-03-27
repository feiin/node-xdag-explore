
function requestLogger(request, response, next) {
    const context = request.context;
    const logger = context.logger;

    if (!request.inProduction) {
        const requestData = {
            ip: request.ip,
            method: request.method,
            href: request.originalUrl,
            headers: request.headers,
            query: request.query,
            params: request.params,
            body: request.body
        };
        logger.debug('request:', requestData);
    }
    next();
}

module.exports = requestLogger;