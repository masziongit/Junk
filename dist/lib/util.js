"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable valid-typeof */

exports.toRes = toRes;
exports.toLowerCase = toLowerCase;
exports.inputDataTable = inputDataTable;
exports.validate = validate;
exports.checkObj = checkObj;

var _index = require("express-validator/check/index");

var _sql = require("../api/sql");

/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
// export function toRes(res, status=200) {
// 	return (err, thing) => {
// 		if (err) return res.status(500).send(err);
//
// 		if (thing && typeof thing.toObject==='function') {
// 			thing = thing.toObject();
// 		}
// 		res.status(status).json(thing);
// 	};
// }

function toRes(db, res, successMsg, sql, param) {
    db.query(sql, param).then(function (results) {
        var result = toLowerCase(JSON.parse(JSON.stringify(results))[0]);
        res.status(200).json({ success: successMsg, result: result });
    });
}

function toLowerCase(obj) {
    if (!obj) {
        return;
    }
    if (typeof obj !== 'Object' && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object') {
        return;
    }
    var keys = Object.keys(obj);
    var result = {};
    keys.map(function (k, v) {
        if (typeof k === 'string') {
            if (typeof obj[k] === 'string') {
                result[k.toLowerCase()] = obj[k].toLowerCase();
            } else {
                // if the node is an object, perform the same process over that node
                if (typeof obj[k] === 'Object' || _typeof(obj[k]) === 'object') {
                    result[k.toLowerCase()] = toLowerCase(obj[k]);
                } else {
                    result[k.toLowerCase()] = obj[k];
                }
            }
        }
    });
    return result;
}

function inputDataTable(db, req, tableName) {
    var entity = db.model({ table: tableName, id: 'prospect_id' });
    var table = entity(req.body);
    table.prospect_id = req.params.id;
    return table;
}

function validate() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var checkList = [];
    fields.forEach(function (field) {
        checkList.push((0, _index.check)(field).exists());
    });
    return checkList;
}

function checkObj() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var obj = arguments[1];


    var ch = false;

    if (obj) {
        for (var name in obj) {
            if (!fields.includes(name)) {
                ch = true;
                break;
            }
        }
    }
    return ch;
}
//# sourceMappingURL=util.js.map