const { check, validationResult } = require('express-validator/check');
const { makeRespond } = require('../../../lib/util');


function get(request, response, next) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ message: errors.mapped(), state: 1 });
    }
    response.json({ state: 0, address: request.params.address });
}

function validators() {

    return [check('address').exists().isBase64().withMessage('Invalid XDag address')]
}


module.exports = makeRespond(validators(), get);