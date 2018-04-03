const XDag = require('node-xdag');

function contextXdag(options) {
    const xdag = new XDag(options);
    
    return function (request, response, next) {
        var context = request.context;
        context.xdag = xdag;
        next();
    }
}

module.exports = contextXdag;