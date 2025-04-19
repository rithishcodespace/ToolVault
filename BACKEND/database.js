const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables

const pool = mysql.createPool({ // create n number of connections so it can handle multiple request 
  host: "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "Rithish@2006",
  database: process.env.DBNAME || "toolrent",
  waitForConnections: true,
  connectionLimit: 10, // Industry standard default
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to DB:", err);
  } else {
    console.log("DB connected successfully!");
    connection.release(); // release the connection back to the pool(after it performs a query it returns the connection back to the pool so this connection can be used for further queries)
  }
});

module.exports = pool;

// connection = get a laptop

// release() = return the laptop

// No release? → No laptops left → Students (queries) have to wait
