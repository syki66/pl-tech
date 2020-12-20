const express = require("express");
const controller = require("./board.controller");
const router = express.Router();

// GET /board - 글 목록 출력
router.get("/", controller.postList);

// GET /board/:page - 해당 페이지 글 내용 출력
router.get("/:postnum", controller.postContents);

// GET /board/more/:page - 공지사항 더보기
router.get("/more/:pagenum", controller.noticeMore);

module.exports = router;
