const util = require('../../middleware/util');
const template = require('../../lib/template');
const models = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var authData =  {
    id : 'tpgus2303',
    password : '111111',
    nickname : 'gogam'
}



exports.loginFigures = (req, res) => {
    if(req.session.is_logined){
        res.redirect('/manage');
    }else{
        res.render('../views/login.html');
    }
}

exports.loginProcess = (req, res) => {
    var post = req.body;
    var id = post.id;
    var password = post.password;

    models.Manager.findAll({
        attributes: ['manager_id', 'password'],
        where: {manager_id:id},
        raw: true
    })
        .then(result => {
            var result_id = result[0].manager_id;
            var hash = result[0].password;
            bcrypt.compare(password, hash, function(err, correspond) {
                // result == true
                if (id === result_id && correspond) {
                    //success!
                    req.session.is_logined = true;
                    req.session.nickname = id;
                    req.session.save(function () {
                        console.log('로그인 성공!');
                        res.redirect('/manage');
                    })
                } else {
                    res.send('Who?');
                }
            });
            
        })
}

exports.logoutMessage = (req, res) => {
    // 로그아웃 메세지
    res.redirect('/manage/auth/logout_process');
}
exports.logoutProcess = (req, res) => {
    req.session.destroy(function(err){
        res.redirect('/board');
    })
}

exports.registerFigures = (req, res) =>{
    res.render('../views/register.html');
}

exports.registerProcess = (req, res) => {
    
    var post = req.body;
    console.log(post);
    var id = post.id;
    var password = post.password;
    var confirm = post.confirm;

    if(password === confirm){
        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            models.Manager.create({
                manager_id: id,
                password: hash
            })
                .then(result => {
                    console.log('관리자가 등록되었습니다.');
                    res.writeHead(302, { Location: '/manage/auth/login' });
                    res.end('success')
                })
                .catch(err => {
                    console.error(err);
                })
        });
    } else{
        console.log('비밀번호가 일치하지 않습니다.');
        return false;
    }

}