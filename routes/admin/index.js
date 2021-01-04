const express = require("express");
const controller = require("./admin.controller");
const validator = require('../../middleware/validator');
const router = express.Router();
const multer = require("multer");
const { validationResult } = require("express-validator");

// /worker/upload 파일 저장 위치 및 이름 변경
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = "./worker";
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const filename = `${req.body.dep}-${req.body.rank}-${req.body.name}.${file.originalname.split(".")[1]}`;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });

// /admin 접근 권한 검사 - 세션 만료시 경고 메세지
// input validation OK
router.use("/", controller.authCheck);

// GET - /admin 관리자 페이지
// session validation 필요?
router.get("/", controller.admin);

// GET - /admin/notice 공지 생성 페이지
// input validation OK
router.get("/notice", controller.createNotice);

// POST - /admin/notice/cprocess 공지 생성 처리 프로세스
// input validation OK
router.post("/notice/cprocess",
validator.title,
validator.contents,
validator.result,
controller.createProcess);

// GET - /admin/notice/manage 공지 관리 페이지
// input validation OK
router.get("/notice/manage/:pageNum", 
validator.pageNum,
validator.result,
controller.manageNotice);

// GET - /admin/notice/:noticeNum/update 공지 수정 페이지
// input validation OK
router.get("/notice/:noticeNum/update", 
validator.pageNum,
validator.noticeNum,
validator.result,
controller.updateNotice);

// PATCH - /admin/notice/:noticeNum/uprocess 공지 수정 처리 프로세스
// input validation OK
router.patch("/notice/:noticeNum/uprocess", 
validator.title,
validator.contents,
validator.noticeNum,
validator.result,
controller.updateProcess);

// DELETE - /admin/notice/:noticeNum/dprocess 공지 삭제 처리 프로세스
// input validation OK
router.delete("/notice/:noticeNum/dprocess", 
validator.noticeNum,
validator.result,
controller.deleteProcess);

// GET - /welcome 환영 페이지 렌더링
// input validation OK
router.get("/welcome", controller.welcome);

// POST - /welcome 환영 페이지 입력
// input validation OK
router.post("/welcome",
validator.visitor,
validator.sentence,
validator.result,
controller.inputWelcome);

// POST - /safety 무재해 페이지 입력 렌더링
// input validation OK
router.get("/safety", controller.safety);

// POST - /safety 무재해 페이지 입력
// input validation OK
router.post("/safety",
validator.safety,
validator.result,
controller.inputSafety);

// GET - /worker 근무자 현황 관리
// input validation OK
router.get("/worker", controller.worker);

// POST - /worker 금일 근무자 적용 프로세스
// input validation OK
router.post("/worker", 
validator.inputWorker,
validator.result,
controller.inputWorker);

// POST - /wmanage/upload 근무자 추가 프로세스
// input validation OK
// file validation 클라이언트 단에서 처리
router.post("/worker/upload",
upload.single("userfile"),
validator.uploadWorker,
validator.result,
controller.uploadWorker);

// DELETE - /worker/delete 근무자 삭제 프로세스
// input validation OK
router.delete("/worker/delete", 
validator.deleteWorker,
validator.result,
controller.deleteWorker);

// GET - /slide 슬라이드 관리
// input validation OK
router.get("/slide", controller.slide);

// POST - /slide 슬라이드 적용
// input validation OK
router.post("/slide",
validator.checks,
validator.checkResult,
validator.result,
controller.inputSlide);

// POST - /slide/lotation 슬라이드 순환 시간 적용
// input validation - 우선 필요 없는 단위는 0 입력하게 해놨음
router.post("/slide/lotation", 
validator.inputLotation,
validator.result,
controller.inputLotation);

// POST - /slide/news 뉴스탭 순환 시간 적용
// input validation - 우선 필요 없는 단위는 0 입력하게 해놨음
router.post("/slide/news", 
validator.inputNews,
validator.result,
controller.inputNews);

module.exports = router;