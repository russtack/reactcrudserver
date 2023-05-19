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
app.use(express.json());

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

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`, `cover`) VALUES(?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("bjok kreated");
  });
});

app.listen(8800, () => {
  console.log("react crud back end connected!!!");
});
