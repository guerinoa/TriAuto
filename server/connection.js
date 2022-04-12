const mysql = require("mysql");

//Allows connection to the sql database deployed through Heroku. 

/** Section below expose secrets, indicating private information regarding database for developers only. In real world application */
/** Database information would not be leaked and would go through numerous security protocols to establish proper information hiding.  **/
var pool = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user : "b7498e9daf3e28" ,
    password: "30433a5c",
    database: "heroku_2a149538abd113b",
    multipleStatements: true
});


module.exports = pool;

//mysql://b7498e9daf3e28:30433a5c@us-cdbr-east-05.cleardb.net/heroku_2a149538abd113b?reconnect=true