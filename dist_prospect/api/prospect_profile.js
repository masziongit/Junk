'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _check = require('express-validator/check');

var _isEmpty = require('is-empty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _util = require('../lib/util.js');

var util = _interopRequireWildcard(_util);

var _sql = require('./sql.js');

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _padNumber = require('pad-number');

var _padNumber2 = _interopRequireDefault(_padNumber);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config_func = void 0; /* eslint-disable no-mixed-spaces-and-tabs,valid-typeof */

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db,
        logger = _ref.logger;


    var api = (0, _express.Router)();
    var errRes = config.errObj;
    var allfield = ['crm_id', 'citizen_id', 'cid_issue_date', 'cid_expiry_date', 'passport_no', 'pp_issue_date', 'pp_expiry_date', 'title_th', 'firstname_th', 'lastname_th', 'title_en', 'firstname_en', 'lastname_en', 'birth_date', 'birth_place', 'reg_addr_nmbr', 'reg_addr_moo', 'reg_addr_building', 'reg_addr_soi', 'reg_addr_road', 'reg_district', 'reg_subdistrict', 'reg_country', 'reg_province', 'reg_postal_cd', 'mobile_no', 'gender', 'marital_status', 'nationality', 'other_nationality', 'education', 'occupation', 'income', 'country_income', 'source_income', 'purpose_for_open_account', 'purpose_for_other', 'pers_ph_nbr', 'pers_ph_ext', 'office_ph_nbr', 'office_ph_ext', 'con_addr_nmbr', 'con_addr_moo', 'con_addr_building', 'con_addr_soi', 'con_addr_road', 'con_district', 'con_subdistrict', 'con_country', 'con_province', 'con_postal_cd', 'company_name', 'off_addr_nmbr', 'off_addr_moo', 'off_addr_building', 'off_addr_soi', 'off_addr_road', 'off_district', 'off_subdistrict', 'off_country', 'off_province', 'off_postal_cd', 'current_same_registered_flag', 'office_same_registered_flag', 'fatca_ans', 'laser_number', 'dopa_flag', 'risklevel', 'risk_calculation_date', 'swf_status', 'email', 'occupation_specify', 'flow_status', 'e_consent_flag', 'ekyc_consent_flag', 'ekyc_consent_date', 'confidence_score', 'prospect_status', 'app_id', 'channel'];
    var reqfield = ['citizen_id', 'prospect_status', 'app_id'];
    var oracledb = require('oracledb');

    config_func = config;

    api.post('/', util.validate(reqfield), function (req, res) {
        // logger.debug(`Get Request body : ${JSON.stringify(req.body)}`)

        var errors = (0, _check.validationResult)(req);
        if (!errors.isEmpty() || util.checkObj(allfield, req.body)) {
            logger.error(errRes.badRequest);
            return res.status(400).json(errRes.badRequest);
        }

        var field = '';
        var param = '';

        for (var oname in req.body) {
            field += oname + ',';
            var value = req.body[oname];

            if ((0, _momentTimezone2.default)(value, 'YYYY-MM-DD').isValid() && value.length == 10) {
                param += 'TO_DATE(\'' + value + '\',\'YYYY-MM-DD\')';
            } else if (oname.endsWith('_flag')) {
                param += value ? 1 : 0;
            } else {
                param += value == null ? null : '\'' + value + '\'';
            }

            param += ',';
        }

        field = field + 'CREATE_DATE , UPDATE_DATE';
        param = param + 'SYSDATE,SYSDATE';

        var sql = 'INSERT INTO ' + config.dabaseTable.prospect_profile + ' (' + field + ') \n                        VALUES (' + param + ') \n                        RETURNING PROSPECT_ID,CREATE_DATE INTO :prospect_id,:create_date';

        logger.debug('Sql : ' + sql);
        //${Math.floor(Math.random() * Math.pow(10, 7))},
        var params = {
            prospect_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            create_date: { type: oracledb.DATE, dir: oracledb.BIND_OUT }
        };
        db.execute(sql, params).then(function (r) {
            var json = {
                prospect_id: r.outBinds.prospect_id[0],
                create_date: r.outBinds.create_date[0]
            };
            Object.assign(json, req.body);

            db.commit();
            res.status(200).json(beautifyResponse(json));

            logger.info('Insert data complete!!');
            // //logger.debug(`Send Response body : ${JSON.stringify(json)}`)
        }).catch(function (e) {
            db.rollback();
            res.status(500).json(errRes.internalServerError);
            logger.error(e);
            throw e;
        });
    });

    api.get('/:id', function (req, res) {

        // logger.debug(`Get Request body : ${JSON.stringify(req.body)}`)

        if (!(0, _isEmpty2.default)(req.params.id)) {
            var id = extractId(req.params.id);

            logger.debug('Sql: ' + _sql.prospect_profile_get);
            logger.debug('prospect_id : ' + id);

            db.execute(_sql.prospect_profile_get, [id.toString()], { outFormat: oracledb.OBJECT }).then(function (r) {
                if (!(0, _isEmpty2.default)(r.rows)) {
                    var json = beautifyResponse(r.rows[0]);
                    json = changeStatusToExpired(json, logger);
                    res.status(200).json(json);

                    logger.info('Search Data complete!!');
                    // //logger.debug(`Send Response body : ${JSON.stringify(json)}`)
                } else {
                    res.status(404).json(errRes.notFound);
                    logger.error(errRes.notFound);
                }
            }).catch(function (e) {
                res.status(500).json(errRes.internalServerError);
                logger.error(e);
                throw e;
            });
        } else {
            res.status(400).json(errRes.invParam);
            logger.error(errRes.invParam);
        }
    });

    api.post('/search', (0, _check.oneOf)([(0, _check.check)('mobile_no').exists(), (0, _check.check)('citizen_id').exists(), (0, _check.check)('passport_no').exists(), (0, _check.check)('firstname_en').exists(), (0, _check.check)('lastname_en').exists(), (0, _check.check)('firstname_th').exists(), (0, _check.check)('lastname_th').exists()]), function (req, res) {

        // logger.debug(`Get Request body : ${JSON.stringify(req.body)}`)

        var errors = (0, _check.validationResult)(req);
        if (!errors.isEmpty()) {
            logger.error(errors.array()[0].msg);
            return res.status(400).json(errRes.badRequest);
        }
        var sql = 'SELECT * FROM prospect_profile p WHERE 1=1';
        var condition = {};
        if (req.body.mobile_no != null) {
            sql += " AND p.mobile_no = :mobileNo";
            Object.assign(condition, { mobileNo: req.body.mobile_no });
        }
        if (req.body.citizen_id != null) {
            sql += " AND p.citizen_id = :citizenId";
            Object.assign(condition, { citizenId: req.body.citizen_id });
        }
        if (req.body.passport_no != null) {
            sql += " AND p.passport_no = :passportNo";
            Object.assign(condition, { passportNo: req.body.passport_no });
        }
        if (req.body.firstname_en != null && req.body.lastname_en != null) {
            sql += " AND p.firstname_en LIKE :firstNameEn AND p.lastname_en LIKE :lastNameEn";
            Object.assign(condition, {
                firstNameEn: req.body.firstname_en + "%",
                lastNameEn: req.body.lastname_en + "%"
            });
        }
        if (req.body.firstname_th != null && req.body.lastname_th != null) {
            sql += " AND p.firstname_th LIKE :firstNameTh AND p.lastname_th LIKE :lastNameTh";
            Object.assign(condition, {
                firstNameTh: req.body.firstname_th + "%",
                lastNameTh: req.body.lastname_th + "%"
            });
        }

        sql += " ORDER BY UPDATE_DATE DESC";

        logger.debug('Sql: ' + sql);

        db.execute(sql, condition, { outFormat: oracledb.OBJECT }).then(function (r) {
            if (!(0, _isEmpty2.default)(r)) {
                var json = JSON.parse(JSON.stringify(r.rows));
                json = _lodash2.default.map(json, beautifyResponse);
                json = changeStatusToExpired(json, logger);
                json = _lodash2.default.reject(json, { prospect_status: 'EXPIRED' });
                if (json.length < 1) {
                    res.status(200).json({ msg: "All data is EXPIRED" });
                } else {
                    res.status(200).json(json);
                }

                logger.info('Search Data complete!!');
                //logger.debug(`Send Response body : ${JSON.stringify(json)}`)
            } else {
                res.status(404).json(errRes.notFound);
                logger.error(errRes.notFound);
            }
        }).catch(function (e) {
            res.status(500).json(errRes.internalServerError);
            logger.error(e);
            throw e;
        });
    });

    api.put('/:id', (0, _check.oneOf)(util.validate(allfield)), function (req, res) {

        // logger.debug(`Get Request body : ${JSON.stringify(req.body)}`)
        var errors = (0, _check.validationResult)(req);

        // Validate request body
        if (!errors.isEmpty() || util.checkObj(allfield, req.body)) {
            logger.error(errRes.badRequest);
            return res.status(400).json(errRes.badRequest);
        }
        // Validate url
        if ((0, _isEmpty2.default)(req.params.id)) {
            logger.error(errRes.invParam);
            return res.status(400).json(errRes.invParam);
        }
        var prospectId = extractId(req.params.id);

        var setfields = '';

        for (var oname in req.body) {

            var value = '' + req.body[oname];

            if ((0, _momentTimezone2.default)(value, 'YYYY-MM-DD').isValid() && value.length == 10) {
                value = 'TO_DATE(\'' + value + '\',\'YYYY-MM-DD\')';
            } else if (oname.endsWith('_flag')) {
                value = value ? 1 : 0;
            } else if (value == 'null') {
                value = null;
            } else {
                value = '\'' + value + '\'';
            }

            setfields += oname + ' = ' + value + ',';
        }

        setfields += 'UPDATE_DATE = SYSDATE';

        var sql = 'UPDATE  ' + config.dabaseTable.prospect_profile + ' SET ' + setfields + ' WHERE PROSPECT_ID = ' + prospectId;

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
            var id = extractId(req.params.id);

            logger.debug('Sql: ' + _sql.prospect_profile_delete);
            logger.debug('prospectId : ' + id);

            db.execute(_sql.prospect_profile_delete, [id]).then(function (r) {

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

var extractId = function extractId(id) {
    var split = id.split(/P\d{4}/);

    if (split.length != 2) {
        return "";
    }
    return parseInt(split[1]);
};

var beautifyResponse = function beautifyResponse(json) {
    json = _lodash2.default.transform(json, function (result, val, key) {
        result[key.toLowerCase()] = val;
        if (key.toLowerCase().endsWith('_flag')) {
            result[key.toLowerCase()] = val === 'true' ? true : false;
        }
        if (val == null) {
            result[key.toLowerCase()] = '';
        }
        if (key.toLowerCase().endsWith('_date')) {
            result[key.toLowerCase()] = (0, _momentTimezone2.default)(val).format("YYYY-MM-DD");
        }
    });
    json.prospect_id = 'P' + (0, _momentTimezone2.default)(json.create_date).format("YYMM") + (0, _padNumber2.default)(parseInt(json.prospect_id), 7);
    return json;
};

var changeStatusToExpired = function changeStatusToExpired(object, logger) {
    var prospect = JSON.parse(JSON.stringify(object));
    var now = (0, _momentTimezone2.default)().tz("Asia/Bangkok");

    if (prospect instanceof Array) {
        prospect.forEach(function (o) {
            expired(now, o, logger);
        });
    } else {
        expired(now, prospect, logger);
    }

    return prospect;
};

var expired = function expired(now, o, logger) {
    var createDate = _momentTimezone2.default.tz(o.create_date, "Asia/Bangkok");
    if (now.diff(createDate, "days") >= config_func.expire_day) {
        o.prospect_status = "EXPIRED";
        logger.info('This Data is EXPIRED');
        logger.debug('Data : ' + JSON.stringify(o));
    }
};
//# sourceMappingURL=prospect_profile.js.map