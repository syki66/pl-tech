const express = require("express");
const router = express.Router();
const controller = require("./alert.controller");

// GET - /alert/auth 접근 권한 오류 알람
router.get("/auth", controller.auth);

// GET - /alert/create 공지 생성 완료 알람
router.get("/create", controller.create);

// GET - /alert/update 공지 수정 완료 알람
router.get("/update", controller.update);

// GET - /alert/delete 공지 삭제 완료 알람
router.get("/delete", controller.delete);

// GET - /alert/welcome 환영문구 작성 완료 알람
router.get("/welcome", controller.welcome);

// GET - /alert/register 관리자 등록 완료 알람
router.get("/register", controller.register);

// GET - /alert/passErr 비밀번호 오류 알람
router.get("/passErr", controller.passErr);

// GET - /alert/idErr 로그인 완료 알람
router.get("/idErr", controller.idErr);

// GET - /alert/login 로그인 완료 알람
router.get("/login", controller.login);

// GET - /alert/logout 로그아웃 완료 알람
router.get("/logout", controller.logout);

// GET - /alert/wmanage 근무자 등록 완료 알람
router.get("/worker", controller.worker);

// GET - /alert/wmanage/warn 근무자 등록 오류 알람
router.get("/worker/warn", controller.workerWarn);

// GET - /alert/safety 무재해 기록판 설정 완료 알람
router.get("/safety", controller.safety);

// GET - /alert/slide 슬라이드 적용 완료 알람
router.get("/slide", controller.slide);

module.exports = router;
