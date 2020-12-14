const util = require('../../middleware/util');
const express = require('express');
const controller = require('./admin.controller');
const router = express.Router();


// GET - /admin 관리자 페이지
router.get('/', controller.admin);

// GET - /admin/post 공지 생성 페이지
router.get('/post', controller.createPost);

// POST - /admin/post/cprocess 공지 생성 처리 프로세스
router.post('/post/cprocess', controller.createProcess);

// GET - /admin/post/manage 공지 관리 페이지
router.get('/post/manage', controller.managePost);

// GET - /admin/post/:postnum/update 공지 수정 페이지
router.get('/post/:postnum/update', controller.updatePost);

// PATCH - /admin/post/:postnum/uprocess 공지 수정 처리 프로세스
router.post('/post/:postnum/uprocess', controller.updateProcess);

// DELETE - /admin/post/:postnum/dprocess 공지 삭제 처리 프로세스
router.post('/post/:postnum/dprocess', controller.deleteProcess);

module.exports = router;