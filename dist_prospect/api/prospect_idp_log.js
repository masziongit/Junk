'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _check = require('express-validator/check');

var _isEmpty = require('is-empty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _sql = require('./sql.js');

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../lib/util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-mixed-spaces-and-tabs */
exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db,
        logger = _ref.logger;


    var api = (0, _express.Router)();
    var errRes = config.errObj;
    var reqfield = ['reference_id', 'identifier', 'namespace', 'status', 'request_date', 'exp_date'];
    var oracledb = require('oracledb');

    api.post('/', util.validate(reqfield), function (req, res) {

        // logger.debug(`Get Request body : ${JSON.stringify(req.body)}`)

        var errors = (0, _check.validationResult)(req);

        if (!errors.isEmpty()) {
            logger.error(errors.array()[0].msg);
            return res.status(400).json(errRes.badRequest);
        }

        var field = '';
        var param = '';

        for (var oname in req.body) {
            field += oname + ',';
            var value = req.body[oname];

            if ((0, _momentTimezone2.default)(value, 'YYYY-MM-DD').isValid() && value.length == 10) {
                param += 'TO_DATE(\'' + value + '\',\'YYYY-MM-DD\'),';
            } else if (oname.endsWith('_flag')) {
                param += value ? 1 : 0 + ',';
            } else {
                param += '\'' + value + '\',';
            }
        }

        field = field + 'CREATE_DATE , UPDATE_DATE';
        param = param + 'SYSDATE,SYSDATE';

        var sql = 'INSERT INTO ' + config.dabaseTable.prospect_idp_log + ' (' + field + ') \n                        VALUES (' + param + ') \n                        RETURNING REFERENCE_ID INTO :reference_id ';

        logger.debug('Sql : ' + sql);

        var params = {
            reference_id: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
        };

        db.execute(sql, params).then(function (r) {
            var json = {
                reference_id: r.outBinds.reference_id[0],
                create_date: (0, _momentTimezone2.default)().tz("Asia/Bangkok").format('YYYY-MM-DD HH:mm:ss')
            };
            Object.assign(json, req.body);

            db.commit();
            res.status(200).json(beautifyResponse(json));

            logger.info('Insert data complete!!');
            //logger.debug(`Send Response body : ${JSON.stringify(json)}`)
        }).catch(function (e) {
            db.rollback();
            res.status(500).json(errRes.internalServerError);
            logger.error(e);
            throw e;
        });
    });

    api.get('/:prospect_id', function (req, res) {

        // logger.debug(`Get Request body : ${JSON.stringify(req.body)}`)

        if ((0, _isEmpty2.default)(req.params.prospect_id)) {
            logger.error(errRes.invParam);
            return res.status(400).json(errRes.invParam);
        }
        var id = req.params.prospect_id;
        db.execute(_sql.prospectIdpLogGet, [id], { outFormat: oracledb.OBJECT }).then(function (r) {
            if (!(0, _isEmpty2.default)(r)) {
                console.log(r.rows);
                var json = JSON.parse(JSON.stringify(r.rows));
                json = _lodash2.default.map(json, beautifyResponse);
                res.status(200).json(json);

                logger.info('Search data complete!!');
                //logger.debug(`Send Response body : ${JSON.stringify(json)}`)
            } else {
                res.status(404).json(errRes.notFound);
            }
        }).catch(function (e) {
            res.status(500).json(errRes.internalServerError);
            logger.error(e);
            throw e;
        });
    });

    api.put('/:prospect_id', function (req, res) {

        // logger.debug(`Get Request body : ${JSON.stringify(req.body)}`)

        var errors = (0, _check.validationResult)(req);
        // Validate request body
        if (!errors.isEmpty()) {
            logger.error(errors.array()[0].msg);
            return res.status(400).json(errRes.badRequest);
        }
        // Validate url
        if ((0, _isEmpty2.default)(req.params.prospect_id)) {
            logger.error(errRes.invParam);
            return res.status(400).json(errRes.invParam);
        }
        var prospectId = req.params.prospect_id;

        var setfields = '';

        for (var oname in req.body) {

            var value = '' + req.body[oname];

            if ((0, _momentTimezone2.default)(value, 'YYYY-MM-DD').isValid() && value.length == 10) {
                value = 'TO_DATE(\'' + value + '\',\'YYYY-MM-DD\')';
            } else if (oname.endsWith('_flag')) {
                value = value ? 1 : 0;
            } else {
                value = '\'' + value + '\'';
            }

            setfields += oname + ' = ' + value + ',';
        }

        setfields += 'UPDATE_DATE = SYSDATE';

        var sql = 'UPDATE  ' + config.dabaseTable.prospect_idp_log + ' SET ' + setfields + ' WHERE PROSPECT_ID = ' + prospectId;

        logger.debug('Sql : ' + sql);

        db.execute(sql).then(function (r) {

            var json = {
                prospect_id: prospectId,
                update_date: (0, _momentTimezone2.default)().tz("Asia/Bangkok").format('YYYY-MM-DD HH:mm:ss')
            };
            Object.assign(json, req.body);

            db.commit();
            res.status(200).json(beautifyResponse(json));

            logger.info('Update data complete!!');
            //logger.debug(`Send Response body : ${JSON.stringify(json)}`)
        }).catch(function (e) {
            db.rollback();
            res.status(500).json(errRes.internalServerError);
            logger.error(e);
            throw e;
        });
    });

    api.delete('/:id', function (req, res) {

        // logger.debug(`Get Request body : ${JSON.stringify(req.body)}`)

        if (!(0, _isEmpty2.default)(req.params.id)) {
            var id = req.params.id;
            db.execute(_sql.prospect_idp_log_delete, [id]).then(function (r) {
                db.commit();
                var json = { prospect_id: id };
                res.status(200).json(beautifyResponse(json));

                logger.info('Delete data complete!!');
                //logger.debug(`Send Response body : ${JSON.stringify(json)}`)
            }).catch(function (e) {
                db.rollback();
                res.status(500).json(errRes.internalServerError);
                logger.error(e);
                throw e;
            });
        } else {
            res.status(400).json(errRes.invParam);
            logger.error(errRes.invParam);
        }
    });

    return api;
};

var beautifyResponse = function beautifyResponse(json) {
    json = _lodash2.default.transform(json, function (result, val, key) {
        result[key.toLowerCase()] = val;
    });
    return json;
};
//# sourceMappingURL=prospect_idp_log.js.map