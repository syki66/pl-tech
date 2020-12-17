const express = require("express");
const router = express.Router();
const session = require('express-session');
const setting = require('./session');

const board = require("./board");
const admin = require("./admin");
const auth = require("./auth");
const home = require("./home");

// 세션 생성
router.use('/', session(setting.sess));

router.use("/board", board);
router.use("/admin", admin);
router.use("/auth", auth);
router.use("/home", home);

module.exports = router;
