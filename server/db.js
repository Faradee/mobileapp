import mysql from "mysql2";
import "dotenv/config";

const host = process.env.HOST;
const port = process.env.POST;
const password = process.env.PASSWORD;
const user = process.env.USER;

const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: "nodemysql",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

export default db;
