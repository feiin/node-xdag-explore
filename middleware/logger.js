
/**
 * create a child logger for each request
 * 
 * @param {bunyun} rootLogger 
 * @param {request} request 
 * @param {response} response 
 * @param {next} next 
 */
function logger(rootLogger, request, response, next) {
    var context = request.context,
        requestLine;

    requestLine = request.method + ' ' + request.url + ' HTTP/' + request.httpVersion;

    context.logger = rootLogger.child({
        ip: request.ip,
        'request-line': requestLine
    }, true);

    next();
}

module.exports = function (rootLogger) {
    return logger.bind(undefined, rootLogger);
};