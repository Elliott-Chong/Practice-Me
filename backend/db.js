const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "elliottchong.com",
  user: "practiceme_user",
  password: "practiceme!@#$",
  database: "practiceme_db",
});
console.log("mysql server connected!");

module.exports = connection;
