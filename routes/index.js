const express = require("express");
const router = express.Router();
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");

const board = require("./board");
const admin = require("./admin");
const auth = require("./auth");
const home = require("./home");

// 세션 생성
<<<<<<< HEAD
router.use('/',session({
    secret: 'pltech key',
    resave: false,
    saveUninitialized: true,
    store:new MySQLStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'rkawk35088',
        database: 'pltech'
    })
  }));
=======
router.use(
  "/",
  session({
    secret: "pl-tech key",
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "1028",
      database: "pltech",
    }),
  })
);
>>>>>>> 76cfef724e0096a4b0c6c4e6a73c6c9a46323315

router.use("/board", board);
router.use("/admin", admin);
router.use("/auth", auth);
router.use("/home", home);

module.exports = router;
