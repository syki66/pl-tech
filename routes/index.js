const express = require("express");
const router = express.Router();
const session = require("express-session");
const setting = require("../routes/session");

const board = require("./board");
const admin = require("./admin");
const auth = require("./auth");
const home = require("./home");
const alert = require("./alert");

// 세션 생성
router.use("/", session(setting.sess));

router.use("/board", board);
router.use("/admin", admin);
router.use("/auth", auth);
router.use("/home", home);
router.use("/alert", alert);

module.exports = router;
