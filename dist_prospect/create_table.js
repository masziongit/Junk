'use strict';

function createTable(con) {

    var config = require('./config.json');
    var q = require('./script_db.js');

    // connect to a database if needed, then pass it to `callback`:
    console.log(config.oracleDB);
    var oracledb = require('oracledb');
    oracledb.createPool(config.oracleDB).then(function (pool) {
        return pool.getConnection();
    }).then(function (conn) {

        for (var i in q.sql) {
            console.log(q.sql[i]);
            conn.execute(q.sql[i]).then(function (r) {
                console.log(r);
            }).catch(function (e) {
                console.log(e);
            });
        }
    });
}

createTable();
//# sourceMappingURL=create_table.js.map