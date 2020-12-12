// index.js : 라우팅
const util = require('../../middleware/util');
const express = require('express');
const controller = require('./board.controller');
const router = express.Router();

// GET /board - 글 목록 출력 
router.get('/', controller.postList);

// GET /board/:page - 해당 페이지 글 내용 출력
router.get('/:postnum', controller.postContents);

module.exports = router;
