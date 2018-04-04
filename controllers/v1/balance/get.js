const { check, query, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const { makeRespond } = require('../../../lib/util');


function get(request, response, next) {
    let context = request.context,
    logger = context.logger,
    xdag = context.xdag;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ message: errors.mapped(), state: 1 });
    }

    const params = matchedData(request);
    logger.info('get balance ', params);

    xdag.getBalance(params.address)
        .then(data => {
            response.json({ state: 0, result: data.result });
        })
        .catch(error => {
            logger.error('get balance error: ', error);
            response.status(400).json({ state: 1, message: 'error' });
        })

}

function validators() {

    return [check('address').exists().isBase64().withMessage('Invalid XDag address')
    ]
}

module.exports = makeRespond(validators(), get);