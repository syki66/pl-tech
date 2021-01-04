const express = require("express");
const router = express.Router();
const controller = require("./alert.controller");

// GET - /alert/auth 접근 권한 오류 알람
router.get("/auth", controller.auth);

// GET - /alert/create 공지 생성 완료 알람
router.get("/create", controller.create);

// GET - /alert/create/title 공지 생성 완료 알람
router.get("/create/title", controller.title);

// GET - /alert/update 공지 수정 완료 알람
router.get("/update", controller.update);

// GET - /alert/confirm 공지 삭제 완료 알람
router.get("/confirm", controller.confirm);

// GET - /alert/delete/:pageNum 공지 삭제 완료 알람
router.get("/delete/:pageNum", controller.delete);

// GET - /alert/welcome 환영문구 작성 완료 알람
router.get("/welcome", controller.welcome);

// GET - /alert/welcome/visitor 방문자명 글자 수 제한 알람
router.get("/welcome/visitor", controller.visitor);

// GET - /alert/welcomve/sentence 환영문구 글자 수 제한 알람
router.get("/welcome/sentence", controller.sentence);

// GET - /alert/register 관리자 등록 완료 알람
router.get("/register", controller.register);

// GET - /alert/login/pw 비밀번호 오류 알람
router.get("/login/pw", controller.passErr);

// GET - /alert/login/id 아이디 오류 알람
router.get("/login/id", controller.idErr);

// GET - /alert/login 로그인 완료 알람
router.get("/login", controller.login);

// GET - /alert/logout 로그아웃 완료 알람
router.get("/logout", controller.logout);

// GET - /alert/worker 근무자 등록 완료 알람
router.get("/worker", controller.worker);

// GET - /alert/worker/select 근무자 선택 오류 알람
router.get("/worker/select", controller.select);

// GET - /alert/worker/upload 근무자 사진 업로드 완료 알람
router.get("/worker/upload", controller.upload);

// GET - /alert/worker/uploadErr 근무자 사진 업로드 오류 알람
router.get("/worker/uploadErr", controller.uploadErr);

// GET - /alert/worker/delete 근무자 사진 삭제 완료 알람
router.get("/worker/delete", controller.wdelete);

// GET - /alert/wmanage/src 근무자 사진 삭제 오류 알람
router.get("/worker/src", controller.workerSrc);

// GET - /alert/safety 무재해 기록판 설정 완료 알람
router.get("/safety", controller.safety);

// GET - /alert/safety/start 무재해 기록판 날짜 설정 오류 알람 - 시작 날짜 > 현재 날짜
router.get("/safety/start", controller.start);

// GET - /alert/safety/target 무재해 기록판 날짜 설정 오류 알람 - 목표 날짜 < 현재 날짜
router.get("/safety/target", controller.target);

// GET - /alert/slide 슬라이드 적용 완료 알람
router.get("/slide", controller.slide);

// GET - /alert/slide/check 슬라이드 체크 오류 알람
router.get("/slide/check", controller.check);

// GET - /alert/slide/lotation 슬라이드 순환 시간 적용 완료 알람
router.get("/slide/lotation", controller.lotation);

// GET - /alert/slide/news 뉴스탭 순환 시간 적용 완료 알람
router.get("/slide/news", controller.news);

module.exports = router;
