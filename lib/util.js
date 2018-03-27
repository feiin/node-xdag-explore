
function makeRespond(middlewares, fn) {
    if (!middlewares) {
        throw new Error('middlewares can not be null');
    }

    if (!fn) {
        return middlewares;
    }

    if (Array.isArray(middlewares)) {
        middlewares.push(fn);
        return middlewares;
    }

    if (typeof middlewares === 'function') {
        return [middlewares, fn];
    }

    return fn;
}

module.exports = {
    makeRespond
}