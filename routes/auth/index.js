const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');


// GET - /auth/login 로그인 페이지
router.get('/login', controller.login);

// POST - /auth/linprocess 로그인 처리 프로세스
router.post('/linprocess', controller.loginProcess); 

// DELET - /auth/loutprocess 로그아웃 처리 프로세스
router.delete('/loutprocess', controller.logoutProcess);

// GET - /auth/register 관리자 등록 페이지
router.get('/register', controller.register);

// POST - /auth/regprocess 관리자 등록 처리 프로세스
router.post('/regprocess', controller.registerProcess);

module.exports = router;