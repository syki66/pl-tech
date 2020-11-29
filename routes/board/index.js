// index.js : 라우팅
const util = require('../../middleware/util');
const express = require('express');
const controller = require('./board.controller');
const router = express.Router();

// 공지 전체 목록 출력 
router.get('/', controller.boardFigures);

router.get('/:page', controller.noticeFigures);

// id 값에 해당하는 공지의 contents(내용) 출력
//router.get('/:id', controller.contentsFigures);

module.exports = router;
