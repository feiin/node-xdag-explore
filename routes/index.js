var express = require('express');
var router = express.Router();
var controllers = require('../controllers/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('request home page');
  const logger = req.context.logger;
  logger.error('request home page', { title: 'Express' });
  console.log('request work.id', process.pid);
  res.render('index', { title: 'Express' });
});

router.get('/v1/block/:address([a-zA-Z0-9\/+]{32})', controllers.v1.block.get);
router.get('/v1/lastblocks/:num', controllers.v1.block.lastblocks);

router.get('/v1/balance/:address([a-zA-Z0-9\/+]{32})', controllers.v1.balance.get);
router.get('/v1/stats', controllers.v1.stats.get);
router.get('/v1/pool/miners', controllers.v1.pool.miners);

module.exports = router;
