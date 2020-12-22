const util = require("../../middleware/util");
const express = require("express");
const controller = require("./admin.controller");
const router = express.Router();

// GET - /admin 관리자 페이지
router.get("/", controller.admin);

// GET - /admin/post 공지 생성 페이지
router.get("/post", controller.createPost);

// POST - /admin/post/cprocess 공지 생성 처리 프로세스
router.post("/post/cprocess", controller.createProcess);

// GET - /admin/post/manage 공지 관리 페이지
router.get("/post/manage/:pagenum", controller.managePost);

// GET - /admin/post/:postnum/update 공지 수정 페이지
router.get("/post/:postnum/update", controller.updatePost);

// PATCH - /admin/post/:postnum/uprocess 공지 수정 처리 프로세스
router.patch("/post/:postnum/uprocess", controller.updateProcess);

// DELETE - /admin/post/:postnum/dprocess 공지 삭제 처리 프로세스
router.delete("/post/:postnum/dprocess", controller.deleteProcess);

// GET - /welcome 환영 페이지 렌더링
router.get("/welcome", controller.welcome);

// POST - /welcome 환영 페이지 입력
router.post("/welcome", controller.inputWelcome);

// GET - /slide 슬라이드 관리
router.get("/slide", controller.slide)

// POST - /slide 슬라이드 적용
router.post("/slide", controller.inputSlide)

// GET - /wbmanage 근무자 현황 관리
router.get("/wmanage", controller.workerManage);

// POST - /wbProcess 금일 근무자 적용 프로세스
router.post("/wmanage", controller.inputWorker);

// POST - /hazard 무재해 페이지 입력 렌더링
router.get("/safety", controller.safety);

// POST - /hazard 무재해 페이지 입력
router.post("/safety", controller.inputSafety);
module.exports = router;
