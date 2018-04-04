const { check, query, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const { makeRespond, arrayPage } = require('../../../lib/util');


function lastBlocks(request, response, next) {
    let context = request.context,
        logger = context.logger,
        xdag = context.xdag;


    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ message: errors.mapped(), state: 1 });
    }

    const params = matchedData(request);

    logger.info('get lastBlocks ', params);
    let num = params.num || 20;
    if(num > 100) {
        num = 100;
    }

    xdag.getLastBlocks(num)
        .then((data) => {

            response.json({ state: 0, result: data.result });
        })
        .catch((err) => {
            logger.error('get lastBlocks error', err);
            response.status(400).json({ state: 1, message: 'error' });
        })
}

function validators() {

    return [check('num').exists().isInt().withMessage('Invalid blocks number')
    ]
}


module.exports = makeRespond(validators(), lastBlocks);