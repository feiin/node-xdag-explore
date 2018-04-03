var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bunyan = require('bunyan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
const middlewares = require('./middleware/index');

var app = express();

const isProduction = (process.env.NODE_ENV == 'production');
app.set('trust proxy', true);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//create Logger with bunyun

var rootLogger = bunyan.createLogger({
    name: 'node-xdag-explore',
    level: isProduction ? 'trace' : 'debug',
    src: !isProduction,
    // streams: [{
    //     type: 'rotating-file',
    //     path: '/var/log/node-xdag-explore.log',
    //     period: '1d',   // daily rotation
    //     count: 5        // keep 5 back copies
    // }]
});


console.error = rootLogger.error.bind(rootLogger);
console.warn = rootLogger.warn.bind(rootLogger);
console.info = rootLogger.info.bind(rootLogger);
console.log = rootLogger.debug.bind(rootLogger);
console.trace = rootLogger.trace.bind(rootLogger);

console.info('init request context');
app.use(middlewares.context());
app.use(middlewares.logger(rootLogger));
app.use(middlewares.requestLogger);
app.use(middlewares.xdag({ socketFile: '/tmp/xdag_test.sock' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
