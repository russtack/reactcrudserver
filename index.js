const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.mysqlPassword,
  database: "test",
});

app.get("/", (req, res) => {
  res.send("hello from the other side");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("react crud back end connected!!!");
});
