/* eslint-disable no-multi-str */
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "task-tracker",
  multipleStatements: true,
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

//get usertasks
app.get("/usertasks", (req, res) => {
  const userId = req.body.users.id;

  db.query(
    "SELECT * FROM tasks WHERE userId =?;",
    userId,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else {
        console.log(err);
      }
    }
  );
});

//update task when complete
app.put("/updatetask", (req, res) => {
  let task = req.body;
  const sql =
    "SET @id = ?; SET @description = ?; SET @day = ?; SET @createdDate = ?; SET @lastUpdated = ?; SET @status = ?;\
  CALL TaskAddOrUpdate(@description,@day,@createdDate,@lastUpdated,@status);";

  db.query(
    sql,
    [
      task.id,
      task.description,
      task.day,
      task.createdDate,
      task.lastUpdated,
      task.status,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});

//save task
app.post("/savetask", (req, res) => {
  let task = req.body;
  const sql =
    "SET @id = ?; SET @description = ?; SET @day = ?; SET @createdDate = ?; SET @lastUpdated = ?; SET @status = ?;\
  CALL TaskAddOrUpdate(@description,@day,@createdDate,@lastUpdated,@status);";

  db.query(
    sql,
    //not sure if i need id here or if it increments automatically
    [
      task.id,
      task.description,
      task.day,
      task.createdDate,
      task.lastUpdated,
      task.status,
    ],
    (err, rows, fields) => {
      if (!err)
        rows.forEach((element) => {
          if (element.constructor === Array)
            res.send("Inserted employee task:" + element[0].id);
        });
    }
  );
});

//delete task
app.delete("/deletetask/:id", (req, res) => {
  db.query(
    "DELETE FROM tasks WHERE id = ?",
    [req.params.id],
    (err, row, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

app.listen(3001, () => {
  console.log("running server");
});
