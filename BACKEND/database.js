const mysql = require("mysql2");
require("dotenv");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Rithish@2006",
    database:"toolrent"
})

db.connect((error)=>{
    if(error)
    {
        console.error(error);
    }
    else console.log("DB connected successfully!");
})

module.exports = db;