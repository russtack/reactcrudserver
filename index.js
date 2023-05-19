const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.root,
  password: process.env.mysqlPassword,
  database: process.env.database,
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
  const q = "INSERT INTO books (`title`,`desc`,`price`, `cover`) VALUES(?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("bjok kreated");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id =?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("bjok deletted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id =?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("bjok upd");
  });
});

app.listen(8800, () => {
  console.log("react crud back end connected!!!");
});
