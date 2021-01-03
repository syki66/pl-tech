const express = require("express");
const controller = require("./board.controller");
const validator = require('../../middleware/validator');
const router = express.Router();

// GET /board - 글 목록 출력
// input validation OK
router.get("/", controller.noticeList);

// GET /board/:noticeNum - 해당 페이지 글 내용 출력
// input validation OK
router.get("/:noticeNum", 
validator.noticeNum,
validator.pageNum,
validator.result,
controller.noticeContents);

// GET /board/more/:pageNum - 공지사항 더보기
// input validation OK
router.get("/more/:pageNum",
validator.pageNum,
validator.result,
controller.noticeMore);

module.exports = router;
