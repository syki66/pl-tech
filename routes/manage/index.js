const util = require('../../middleware/util');
const express = require('express');
const controller = require('./manage.controller');
const router = express.Router();

// 관리자 페이지
router.get('/', controller.manageFigures);

// 글 생성 페이지
router.get('/newnotice', controller.newnoticeFigures);

// 글 생성 처리 프로세스
router.get('/newnotice/create_process', controller.noticeCreate);

// 글 수정 처리 프로세스
router.get('/newnotice/update_process', controller.noticeUpdate);

// 글 관리 페이지
router.get('/post', controller.postFigures);

module.exports = router;