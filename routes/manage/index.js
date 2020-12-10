const util = require('../../middleware/util');
const express = require('express');
const controller = require('./manage.controller');
const auth_controller = require('./auth.controller');
const router = express.Router();
var bodyParser = require('body-parser');

// session
var session = require('express-session')
var FileStore = require('session-file-store')(session);


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

router.get('/auth', function (req, res, next) {
    if(req.session.num === undefined){
        req.session.num = 1;
    } else{
        req.session.num = req.session.num +1;
    }
    res.send(`Views : ${req.session.num}`);
})

// 세션 생성
router.use('/auth',session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
  }))

// 로그인 페이지
router.get('/auth/login', auth_controller.loginFigures);

// 로그인 처리 프로세스
router.post('/auth/login_process', auth_controller.loginProcess); 

// 로그아웃 메세지
router.get('/auth/logout', auth_controller.logoutMessage);

// 로그아웃 처리 프로세스
router.get('/auth/logout_process', auth_controller.logoutProcess);

module.exports = router;