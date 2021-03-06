const express = require("express");
const router = express.Router();
const validator = require("../../middleware/validator");
const controller = require("./auth.controller");

// GET - /auth/login 로그인 페이지
// input validation OK
router.get("/login", controller.login);

// POST - /auth/linprocess 로그인 처리 프로세스
// input validation OK
router.post(
  "/linprocess",
  validator.id,
  validator.password,
  validator.result,
  controller.loginProcess
);

// DELET - /auth/loutprocess 로그아웃 처리 프로세스
// input validation OK
router.post("/loutprocess", controller.logoutProcess);

// GET - /auth/register 관리자 등록 페이지
// input validation OK
router.get("/register", controller.register);

// GET - /auth/register 관리자 등록 페이지
router.get("/regprocess", controller.registerProcess);

// POST - /auth/regprocess 관리자 등록 처리 프로세스
// input validation OK
router.post(
  "/regprocess",
  validator.id,
  validator.password,
  validator.confirm,
  validator.result,
  controller.registerProcess
);

router.post("/checkid", validator.id, validator.result, controller.checkID);
router.post(
  "/checkpassword",
  validator.password,
  validator.result,
  controller.checkPassword
);
router.post(
  "/checkconfirm",
  validator.confirm,
  validator.result,
  controller.checkConfirm
);

module.exports = router;
