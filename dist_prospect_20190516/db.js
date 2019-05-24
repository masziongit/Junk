"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require("./config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (logger, callback) {
    // connect to a database if needed, then pass it to `callback`:

    var oracleCon = {
        "user": process.env.DB_USER,
        "connectString": process.env.DB_CONNECT_STRING
    };
    logger.debug("Database config " + JSON.stringify(oracleCon));
    oracleCon.password = decrypt(process.env.DB_PASSWORD);

    Object.assign(oracleCon, _config2.default.oracle_option);

    var oracledb = require('oracledb');
    oracledb.createPool(oracleCon).then(function (pool) {
        return pool.getConnection();
    }).then(function (conn) {
        callback(conn);
    });
};

var crypto = require('crypto'),
    algorithm = _config2.default.crypto.algorithm,
    password = _config2.default.crypto.password;

function decrypt(text) {
    var algorithm = _config2.default.crypto.algorithm;
    var password = 'jwJ3j6bvHEtRrHUpbtf1';
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
//# sourceMappingURL=db.js.map