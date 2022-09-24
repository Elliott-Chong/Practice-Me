const mysql = require("mysql2");
let connection;
try {
  connection = mysql.createConnection({
    host: "elliottchong.com",
    user: "practiceme_user",
    password: "practiceme!@#$",
    database: "practiceme_db",
  });
  console.log("mysql server connected!");
} catch (error) {
  console.error(error);
}

module.exports = connection;
