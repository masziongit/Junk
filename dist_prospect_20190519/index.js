'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morganBody = require('morgan-body');

var _morganBody2 = _interopRequireDefault(_morganBody);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _prospect_profile = require('./api/prospect_profile.js');

var _prospect_profile2 = _interopRequireDefault(_prospect_profile);

var _prospect_idp_log = require('./api/prospect_idp_log.js');

var _prospect_idp_log2 = _interopRequireDefault(_prospect_idp_log);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// app.server = http.createServer(app);

var options = {
    ca: _fs2.default.readFileSync(_config2.default.certs.ca || process.env.CA),
    cert: _fs2.default.readFileSync(_config2.default.certs.cert || process.env.CERT),
    key: _fs2.default.readFileSync(_config2.default.certs.key || process.env.KEY)
};

_log4js2.default.configure(_config2.default.log4j_configure);

var logger = _log4js2.default.getLogger(process.env.LOG_CATEGORY);

var morganConfig = {
    maxBodyLength: 10000,
    logRequestBody: !(logger.level == 'INFO'),
    logResponseBody: !(logger.level == 'INFO')
    // logger
};(0, _morganBody2.default)(app, morganConfig);

app.use(_log4js2.default.connectLogger(logger, { level: 'auto' }));

// 3rd party middleware
app.use((0, _cors2.default)({
    exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
    limit: _config2.default.bodyLimit
}));

// connect to db
(0, _db2.default)(logger, function (db) {
    var oracledb = require('oracledb');
    // internal middleware
    app.use((0, _middleware2.default)({ config: _config2.default, db: db }));

    // api router
    app.use('/prospect_profile', (0, _prospect_profile2.default)({ config: _config2.default, db: db, logger: logger }));
    app.use('/prospect_idp_log', (0, _prospect_idp_log2.default)({ config: _config2.default, db: db, logger: logger }));

    logger.info('Log level [' + logger.level.toString().toUpperCase() + ']');
    logger.debug('Log4j config ' + JSON.stringify(_config2.default.log4j_configure));

    app.listen(process.env.PORT || _config2.default.port, function () {
        console.log('Started Http on PROSPECT');
        logger.info('Started Http on port ' + (process.env.PORT || 'default'));
    });

    var server = _https2.default.createServer(options, app);
    server.listen(process.env.PORTS || _config2.default.ports, function () {
        console.log('Started Https on PROSPECT');
        logger.info('Started Https on port ' + (process.env.PORTS || 'default'));
    });

    setInterval(function () {
        db.execute('SELECT 1 FROM DUAL', [], { outFormat: oracledb.OBJECT }).then(function (resp) {
            // logger.info(` checking database connection ${JSON.stringify(resp)}`);
        }).catch(function (err) {
            logger.error(err);
            process.exit(1);
        });
    }, 1000);

    function closePoolAndExit() {
        console.log("\nTerminating");
        try {
            // Get the pool from the pool cache and close it when no
            // connections are in use, or force it closed after 10 seconds
            oracledb.getPool().close(10, function (err) {
                if (err) console.error(err.message);else console.log("Pool closed");
                process.exit(0);
            });
        } catch (err) {
            logger.error(err);
            process.exit(1);
        }
    }

    process.once('SIGTERM', closePoolAndExit).once('SIGINT', closePoolAndExit);
});

exports.default = app;
//# sourceMappingURL=index.js.map