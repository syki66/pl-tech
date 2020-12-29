const express = require("express");
const controller = require("./board.controller");
const router = express.Router();

// GET /board - 글 목록 출력
router.get("/", controller.noticeList);

// GET /board/:noticeNum - 해당 페이지 글 내용 출력
router.get("/:noticeNum", controller.noticeContents);

// GET /board/more/:pageNum - 공지사항 더보기
router.get("/more/:pageNum", controller.noticeMore);

module.exports = router;
