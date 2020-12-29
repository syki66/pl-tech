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

// GET - /alert/welcome/visitor 방문자명 글자 수 제한 알람
router.get("/welcome/visitor", controller.visitor);

// GET - /alert/welcomve/sentence 환영문구 글자 수 제한 알람
router.get("/welcome/sentence", controller.sentence);

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

// GET - /alert/worker 근무자 등록 완료 알람
router.get("/worker", controller.worker);

// GET - /alert/worker/dep dep 입력 오류 알람
router.get("/worker/dep", controller.dep);

// GET - /alert/worker/rank rank 입력 오류 알람
router.get("/worker/rank", controller.rank);

// GET - /alert/worker/name name 입력 오류 알람
router.get("/worker/name", controller.name);

// GET - /alert/worker/upload 근무자 등록 완료 알람
router.get("/worker/upload", controller.upload);

// GET - /alert/worker/uploadErr 근무자 등록 완료 알람
router.get("/worker/uploadErr", controller.uploadErr);

// GET - /alert/worker/delete 근무자 사진 삭제 완료 알람
router.get("/worker/delete", controller.wdelete);

// GET - /alert/wmanage/warn 근무자 사진 삭제 오류 알람
router.get("/worker/warn", controller.workerWarn);

// GET - /alert/safety 무재해 기록판 설정 완료 알람
router.get("/safety", controller.safety);

// GET - /alert/safety/hazard 무재해 기록판 배수 설정 오류 알람 - 3자리 초과
router.get("/safety/hazard", controller.hazard);

// GET - /alert/safety/start 무재해 기록판 날짜 설정 오류 알람 - 시작 날짜 > 현재 날짜
router.get("/safety/start", controller.start);

// GET - /alert/safety/target 무재해 기록판 날짜 설정 오류 알람 - 목표 날짜 < 현재 날짜
router.get("/safety/target", controller.target);

// GET - /alert/slide 슬라이드 적용 완료 알람
router.get("/slide", controller.slide);

module.exports = router;
