"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//prospect_profile
var prospect_profile_get = exports.prospect_profile_get = "SELECT *\n    FROM\n    prospect_profile p\n    WHERE\n    p.PROSPECT_ID = :prospect_id\n    AND ROWNUM <= 1";

var prospect_profile_get_last_id = exports.prospect_profile_get_last_id = "select * from prospect_profile order by prospect_id desc LIMIT 1";

var prospect_profile_delete = exports.prospect_profile_delete = "delete from prospect_profile where prospect_id = :prospectId";

//prospect_idp_log
var prospect_idp_log_get = exports.prospect_idp_log_get = "SELECT\n" + "    *\n" + "    FROM\n" + "    prospect_idp_log As p\n" + "WHERE\n" + "p.PROSPECT_ID = @prospectId\n" + "ORDER BY DATETIME(p.UPDATE_DATE) DESC LIMIT 1";

var prospectIdpLogGet = exports.prospectIdpLogGet = "SELECT * FROM prospect_idp_log p WHERE p.PROSPECT_ID = :prospectId ORDER by  p.EXP_DATE DESC";

var prospect_idp_log_delete = exports.prospect_idp_log_delete = "delete from prospect_idp_log where prospect_id = :prospectId";
//# sourceMappingURL=sql.js.map