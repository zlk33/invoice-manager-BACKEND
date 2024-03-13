const mysql = require("mysql2");
const { db_pass, db_user, db_ip, db_name } = require("../config");

try {
  const pool = mysql
    .createPool({
      host: db_ip,
      user: db_user,
      password: db_pass,
      database: db_name,
      connectionLimit: 10,
    })
    .promise();

  // Test połączenia z bazą danych
  pool
    .query("SELECT 1")
    .then(() => {
      console.log("\x1b[32m> Mysql connected successfully!\x1b[0m");
    })
    .catch((error) => {
      console.log(
        "\x1b[31m> Can't connect with Mysql: " + error.message + "\x1b[0m"
      );
    });

  module.exports = pool;
} catch (e) {
  console.log("Error: ", e);
}
