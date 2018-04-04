const { check, query, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const { makeRespond, arrayPage } = require('../../../lib/util');


function get(request, response, next) {
    let context = request.context,
        logger = context.logger,
        xdag = context.xdag;


    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ message: errors.mapped(), state: 1 });
    }

    const params = matchedData(request);

    logger.info('get active miners ', params);
    let pn = params.pn || 1;

    xdag.getMiners('active')
        .then((data) => {

            data.result.miners = arrayPage(data.result.miners, pn, 20);

            response.json({ state: 0, result: data.result });
        })
        .catch((err) => {
            logger.error('get active miners', err);
            response.status(400).json({ state: 1, message: 'error' });
        })
}

function validators() {

    return [query('pn').optional().isInt().withMessage("Invalid miners page number")
    ]
}


module.exports = makeRespond(validators(), get);