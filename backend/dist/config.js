const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "pzi042024",
  password: "csdigital2023",
  database: "pzi042024",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");

  connection.query("USE casino", (err, result) => {
    if (err) {
      console.error("Error selecting casino database:", err);
      return;
    }
    console.log("Selected casino database.");
  });
});

module.exports = connection;
