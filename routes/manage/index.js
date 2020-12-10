const util = require('../../middleware/util');
const express = require('express');
const controller = require('./manage.controller');
const auth_controller = require('./auth.controller');
const router = express.Router();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

// session
// var FileStore = require('session-file-store')(session);


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

// 세션 생성

router.use('/auth',session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:new MySQLStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'rkawk35088',
        database: 'pl-tech'
    })
  }))


// 로그인 페이지
router.get('/auth/login', auth_controller.loginFigures);

// 로그인 처리 프로세스
router.post('/auth/login_process', auth_controller.loginProcess); 

// 로그아웃 메세지
router.get('/auth/logout', auth_controller.logoutMessage);

// 로그아웃 처리 프로세스
router.get('/auth/logout_process', auth_controller.logoutProcess);

// 관리자 등록 페이지
router.get('/auth/register', auth_controller.registerFigures);

// 관리자 등록 처리 프로세스
router.post('/auth/register_process', auth_controller.registerProcess);

module.exports = router;