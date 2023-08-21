const sql = require("mysql");

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
  port:3307
});

db.connect((err) => {
  err ? console.log("Error Connecting Database!") : console.log("Database Connected Successfully");
});

module.exports = db