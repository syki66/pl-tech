const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const session = require('express-session');
const setting = require('./session');
=======
const session = require("express-session");
const setting = require("../routes/session");
>>>>>>> d30af68b84eaf900d85a4b48cbade95bb80ea9ec

const board = require("./board");
const admin = require("./admin");
const auth = require("./auth");
const home = require("./home");
const alert = require("./alert");

// 세션 생성
<<<<<<< HEAD
router.use('/', session(setting.sess));
=======
router.use("/", session(setting.sess));
>>>>>>> d30af68b84eaf900d85a4b48cbade95bb80ea9ec

router.use("/board", board);
router.use("/admin", admin);
router.use("/auth", auth);
router.use("/home", home);
router.use("/alert", alert);

module.exports = router;
