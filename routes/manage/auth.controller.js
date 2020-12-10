const util = require('../../middleware/util');
const template = require('../../lib/template');

var authData =  {
    id : 'tpgus2303',
    password : '111111',
    nickname : 'gogam'
}

exports.loginFigures = (req, res) => {
    if(req.session.is_logined){
        res.redirect('/manage');
    }else{
        res.send(template.login());
    }
}

exports.loginProcess = (req, res) => {
    var post = req.body;
    var id = post.id;
    var password = post.password;

    if(id === authData.id && password === authData.password){
        //success!
        req.session.is_logined = true;
        req.session.nickname = id;
        req.session.save(function(){
            console.log('로그인 성공!');
            res.redirect('/manage');
        })
    } else{
        res.send('Who?');
    }
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

