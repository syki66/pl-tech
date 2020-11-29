const util = require('../../middleware/util');
const express = require('express');
const controller = require('./manage.controller');
const router = express.Router();
var bodyParser = require('body-parser');

// 관리자 페이지
router.get('/', controller.manageFigures);

// 글 작성 페이지
router.get('/newnotice', controller.newnoticeFigures);

// 글 생성 처리 프로세스
router.post('/newnotice/create_process', controller.createNotice);

// 글 관리 페이지
router.get('/post', controller.postFigures);

// 글 수정 페이지
router.get('/newnotice/:page', controller.editFigures);

// 글 수정 처리 프로세스
router.post('/newnotice/update_process', controller.updateNotice);

// 글 삭제 처리 프로세스
router.post('/newnotice/delete_process', controller.deleteNotice);



module.exports = router;