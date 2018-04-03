const { check, query, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
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

    logger.info('get block ', params);
    let ad_pn = params.ad_pn || 1;
    let tx_pn = params.tx_pn || 1;

    xdag.getBlock(params.address)
        .then((data) => {
            
            data.result.address = arrayPage(data.result.address, ad_pn, 10);
            data.result.transaction = arrayPage(data.result.transaction, ad_pn, 10);

            response.json({ state: 0, result: data.result });
        })
        .catch((err) => {
            logger.error('get block', err);
            response.status(400).json({ state: 1, message: 'error' });
        })
}

function validators() {

    return [check('address').exists().isBase64().withMessage('Invalid XDag address'),
    query('ad_pn').optional().isInt().withMessage("Invalid address page number"),
    query('tx_pn').optional().isInt().withMessage("Invalid transaction page bumber")
    ]
}


module.exports = makeRespond(validators(), get);