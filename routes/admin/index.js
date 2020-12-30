const util = require("../../middleware/util");
const express = require("express");
const controller = require("./admin.controller");
const router = express.Router();
const multer = require("multer");

// /worker/upload 파일 저장 위치 및 이름 변경
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = "./worker";
    cb(null, dest);
  },
  filename : function(req, file, cb){
        // 부서명 1~8자
        if(req.body.dep === "" || req.body.dep.length > 8){
            cb("dep error");
        }
        // 직급 1~8자
        else if(req.body.rank === "" || req.body.rank.length > 8){
            cb("rank error");
        }
        // 이름 1~8자
        else if(req.body.name === "" || req.body.name.length > 8){
            cb("name error")
        }else{
            const filename = `${req.body.dep}-${req.body.rank}-${req.body.name}.${file.originalname.split('.')[1]}`;
            cb(null, filename);
        }
    } 
});
const upload = multer({ storage: storage });

// /admin 접근 권한 검사 - 세션 만료시 경고 메세지
router.use("/", controller.authCheck);

// GET - /admin 관리자 페이지
router.get("/", controller.admin);

// GET - /admin/notice 공지 생성 페이지
router.get("/notice", controller.createNotice);

// POST - /admin/notice/cprocess 공지 생성 처리 프로세스
router.post("/notice/cprocess", controller.createProcess);

// GET - /admin/notice/manage 공지 관리 페이지
router.get("/notice/manage/:pageNum", controller.manageNotice);

// GET - /admin/notice/:noticeNum/update 공지 수정 페이지
router.get("/notice/:noticeNum/update", controller.updateNotice);

// PATCH - /admin/notice/:noticeNum/uprocess 공지 수정 처리 프로세스
router.patch("/notice/:noticeNum/uprocess", controller.updateProcess);

// DELETE - /admin/notice/:noticeNum/dprocess 공지 삭제 처리 프로세스
router.delete("/notice/:noticeNum/dprocess", controller.deleteProcess);

// get - /admin/notice/:noticeNum/dprocess 공지 삭제 처리 프로세스
router.post("/notice/:noticeNum/confirm", controller.confirm);

// GET - /welcome 환영 페이지 렌더링
router.get("/welcome", controller.welcome);

// POST - /welcome 환영 페이지 입력
router.post("/welcome", controller.inputWelcome);

// POST - /safety 무재해 페이지 입력 렌더링
router.get("/safety", controller.safety);

// POST - /safety 무재해 페이지 입력
router.post("/safety", controller.inputSafety);

// GET - /worker 근무자 현황 관리
router.get("/worker", controller.worker);

// POST - /worker 금일 근무자 적용 프로세스
router.post("/worker", controller.inputWorker);

// POST - /wmanage/upload 금일 근무자 적용 프로세스
router.post(
  "/worker/upload",
  upload.single("userfile"), controller.uploadError,
  controller.uploadWorker
);

// DELETE - /worker/delete 금일 근무자 적용 프로세스
router.delete("/worker/delete", controller.deleteWorker);

// GET - /slide 슬라이드 관리
router.get("/slide", controller.slide);

// POST - /slide 슬라이드 적용
router.post("/slide", controller.inputSlide);

// POST - /slide 슬라이드 순환 시간 적용
router.post("/slide/lotation", controller.inputLotation);

// POST - /slide 뉴스탭 순환 시간 적용
router.post("/slide/news", controller.inputNews);

module.exports = router;
