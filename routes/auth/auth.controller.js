const util = require('../../middleware/util');
const models = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const error = require('../../lib/error');
const message = require('../../lib/message');


// GET - /auth/login 로그인 페이지
exports.login = (req, res) => {
    console.log(req.session);
    if(req.session.is_logined){
        res.redirect('/admin');
    }else{
        res.render('../views/login.html');
    }
}

// POST - /auth/linprocess 로그인 처리 프로세스
exports.loginProcess = (req, res) => {
    var post = req.body;
    var in_id = post.id;
    var in_pw = post.password;

    models.Admin.findAll({
        attributes: ['admin_id', 'password'],
        where: { admin_id: in_id },
        raw: true
    })
        .then(data => {
            //console.log(data);
            if (data.length !== 0) {
                var admin_id = data[0].admin_id;
                var hashed_pw = data[0].password;
                // 비밀번호 확인
                bcrypt.compare(in_pw, hashed_pw, function (err, corr) {
                    // 아이디 확인
                    if (in_id === admin_id && corr) {
                        //success!
                        req.session.is_logined = true;
                        req.session.admin_id = in_id;
                        req.session.save(function () {
                            console.log(`관리자 ${admin_id} 로그인 했습니다.`);
                            res.redirect('/alert/login');
                            //res.json(util.successTrue(message.loginMsg()));
                        })
                    } else {
                        console.log('비밀번호가 일치하지 않습니다.');
                        res.json(util.successFalse(error.pwErr()));
                    }
                });

            } else {
                console.log('아이디가 존재하지 않습니다.');
                res.json(util.successFalse(error.idErr()));
            }

        })
        .catch(err=>{
            console.log('로그인에 실패했습니다.');
            res.json(util.successFalse(error.loginErr()));
        })
}

// DELET - /auth/loutprocess 로그아웃 처리 프로세스
exports.logoutProcess = (req, res) => {
    req.session.destroy(function(err){
        res.redirect('/alert/logout');
        console.log('로그아웃 했습니다.');
        //res.json(util.successTrue(message.logoutMsg()));
    })
}

// GET - /auth/register 관리자 등록 페이지
exports.register = (req, res) =>{
    res.render('../views/register.html');
}

// POST - /auth/regprocess 관리자 등록 처리 프로세스
exports.registerProcess = (req, res) => {
    
    var post = req.body;
    //console.log(post);
    var in_id = post.id;
    var in_pw = post.password;
    var in_conf = post.confirm;

    if(in_pw === in_conf){
        bcrypt.hash(in_pw, saltRounds, function(err, hashed_pw) {
            models.Admin.create({
                admin_id: in_id,
                password: hashed_pw
            })
                .then(data => {
                    console.log('새 관리자가 등록되었습니다.');
                    res.redirect("/alert/register");
                    //res.json(util.successTrue(message.registerMsg()));
                    
                })
                .catch(err => {
                    console.log('관리자 등록에 실패했습니다.');
                    res.json(util.successFalse(error.registerErr()));
                })
        });
    } else{
        console.log('비밀번호가 일치하지 않습니다.');
        res.json(util.successFalse(error.pwErr()));
    }

}