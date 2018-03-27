
function context(defaults) {
    const inProduction = (process.env.NODE_ENV == 'production');

    if (typeof defaults == 'undefined') {
        defaults = {}
    }
    if (typeof defaults !== 'object') {
        throw new Error('Invalid defaults');
    }

    return function (request, response, next) {
        if (!request.context) {
            request.context = {};
            request.inProduction = inProduction;
            Object.keys(defaults).forEach((key) => {
                request.context[key] = defaults[key];
            });
            request.context.requestTime = new Date();

        }

        next();
    }
}

module.exports = context;