const express = require("express");
const router = express.Router();
const controller = require("./alert.controller");

// GET - /alert/welcome 환영문구 작성 완료 알람
router.get("/welcome", controller.welcome);

// GET - /alert/register 관리자 등록 완료 알람
router.get("/register", controller.register);

// GET - /alert/login 로그인 완료 알람
router.get("/login", controller.login);

// GET - /alert/logout 로그아웃 완료 알람
router.get("/logout", controller.logout);

// GET - /alert/wmanage 로그아웃 완료 알람
router.get("/wmanage", controller.wmanage);

module.exports = router;
