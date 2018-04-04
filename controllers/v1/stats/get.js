
function get(request, response, next) {
    let context = request.context,
    logger = context.logger,
    xdag = context.xdag;
    
    xdag.getStats()
        .then(data => {
            response.json({ state: 0, result: data.result });
        })
        .catch(error => {
            logger.error('get stats error: ', error);
            response.status(400).json({ state: 1, message: 'error' });
        })

}


module.exports = get;