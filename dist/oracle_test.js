"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var oracledb = require('oracledb');

var config = {
    user: "C##testsc",
    password: "qwerty",
    connectString: "192.168.99.101/xe",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
};

var db = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var pool, conn, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return oracledb.createPool(config);

                    case 2:
                        pool = _context.sent;
                        _context.next = 5;
                        return oracledb.getConnection();

                    case 5:
                        conn = _context.sent;
                        _context.next = 8;
                        return conn.execute("UPDATE  prospect_profile SET crm_id = '1237',citizen_id = '1234567890123',cid_issue_date = TO_DATE('2018-08-16','YYYY-MM-DD'),cid_expiry_date = TO_DATE('2018-08-16','YYYY-MM-DD'),passport_no = '1234567890123',pp_issue_date = TO_DATE('2018-08-16','YYYY-MM-DD'),pp_expiry_date = TO_DATE('2018-08-16','YYYY-MM-DD'),title_th = '\u0E04\u0E33\u0E19\u0E33\u0E2B\u0E19\u0E49\u0E32\u0E0A\u0E37\u0E48\u0E2D',firstname_th = '\u0E0A\u0E37\u0E48\u0E2D',lastname_th = '\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25',title_en = 'title',firstname_en = 'firstname',lastname_en = 'lastname',birth_date = TO_DATE('2018-08-16','YYYY-MM-DD'),reg_addr_nmbr = '\u0E1A\u0E49\u0E32\u0E19\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48',reg_addr_moo = '\u0E2B\u0E21\u0E39\u0E48',reg_addr_building = '\u0E2D\u0E32\u0E04\u0E32\u0E23',reg_addr_soi = '\u0E0B\u0E2D\u0E22',reg_addr_road = '\u0E16\u0E19\u0E19',reg_district = '\u0E2D\u0E33\u0E40\u0E20\u0E2D',reg_subdistrict = '\u0E15\u0E33\u0E1A\u0E25',reg_country = '\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28',reg_province = '\u0E08\u0E31\u0E07\u0E2B\u0E27\u0E31\u0E14',reg_postal_cd = '10000',mobile_no = '\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E21\u0E37\u0E2D\u0E16\u0E37\u0E2D',gender = 'M',marital_status = '1',nationality = '\u0E2A\u0E31\u0E0D\u0E0A\u0E32\u0E15\u0E34',other_nationality = '\u0E40\u0E0A\u0E37\u0E49\u0E2D\u0E0A\u0E32\u0E15\u0E34',education = '\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32',occupation = '\u0E2D\u0E32\u0E0A\u0E35\u0E1E',income = '\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49',country_income = '\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49',source_income = '\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49',purpose_for_saving_flag = 1,purpose_for_investment_flag = 1,purpose_for_risk_management_flag = 1,purpose_for_payroll_acct_flag = 1,purpose_for_other_flag = 1,purpose_for_other = '\u0E27\u0E31\u0E15\u0E16\u0E38\u0E1B\u0E23\u0E30\u0E2A\u0E07\u0E04\u0E4C\u0E2D\u0E37\u0E48\u0E19 \u0E46',pers_ph_nbr = 'pers_ph_nbr',pers_ph_ext = 'pers_ph_ext',office_ph_nbr = 'office_ph_nbr',office_ph_ext = 'office_ph_ext',con_addr_nmbr = 'con_addr_nmbr',con_addr_moo = 'con_addr_moo',con_addr_building = 'con_addr_building',con_addr_soi = 'con_addr_soi',con_addr_road = 'con_addr_road',con_district = 'con_district',con_subdistrict = 'con_subdistrict',con_country = 'con_country',con_province = 'con_province',con_postal_cd = '10000',company_name = 'company_name',off_addr_nmbr = 'off_addr_nmbr',off_addr_moo = 'off_addr_moo',off_addr_building = 'off_addr_building',off_addr_soi = 'off_addr_soi',off_addr_road = 'off_addr_road',off_district = 'off_district',off_subdistrict = 'off_subdistrict',off_country = 'off_country',off_province = 'off_province',off_postal_cd = '10000',fatca_ans = 'fatca_ans',laser_number = 'laser_number',dopa_flag = 1,risklevel = '1',risk_calculation_date = TO_DATE('2018-08-16','YYYY-MM-DD'),swf_status = 'swf_status',email = 'email@email.com',occupation_specify = 'occupation_specify',flow_status = 'flow_status',e_consent_flag = 1,ekyc_consent_flag = 1,ekyc_consent_date = TO_DATE('2018-08-16','YYYY-MM-DD'),confidence_score = '100',prospect_status = 'prospect_status',app_id = '1',UPDATE_DATE = SYSDATE WHERE PROSPECT_ID = 162");

                    case 8:
                        result = _context.sent;


                        console.log(result.rows);

                    case 10:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function db() {
        return _ref.apply(this, arguments);
    };
}();

db();

// oracledb.getConnection(
//     {
//         user: "payment_hub",
//         password: "qwerty",
//         connectString: "192.168.99.101/xe"
//     },
//     function (err, connection) {
//         if (err) {
//             console.error(err.message);
//             return;
//         }
//         connection.execute(
//             `SELECT *
//                 FROM ext_general_acct_table
//                 WHERE bank_id = '011' AND scheme_type != 'OAB' AND LENGTH(account_id) = 10`,
//             // bind value for :id
//             function (err, result) {
//                 if (err) {
//                     console.error(err.message);
//                     doRelease(connection);
//                     return;
//                 }
//                 console.log(result.rows);
//                 doRelease(connection);
//             });
//     });

function doRelease(connection) {
    connection.close(function (err) {
        if (err) console.error(err.message);
    });
}
//# sourceMappingURL=oracle_test.js.map