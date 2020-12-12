const util = require('../../middleware/util');
const models = require('../../models');
const template = require('../../lib/template');
const error = require('../../lib/error');
const message = require('../../lib/message');

// GET - /admin 관리자 페이지
exports.admin = (req, res) => {
    // 관리자 페이지 UI
    console.log('called admin')
    res.render('../views/admin.html');
}

// GET - /admin/post 공지 생성 페이지
exports.createPost = (req, res) => {
    // 공지 생성 UI
    console.log('called createPost')
    res.render('../views/writing.html');
}

// POST - /admin/post/cprocess 공지 생성 처리 프로세스 (권한 검사)
exports.createProcess = (req, res) => {
    console.log('called createProcess')

    // 로그인 검사
    var isAdminStatus = util.isAdminStatus(req,res);
    
    if (isAdminStatus) {
        var body = req.body;
        var _title = body.title;
        var _contents = body.contents;

        models.Notice.create({
            title: _title,
            contents: _contents
        })
        .then(data => {
            console.log(data.dataValues);
            console.log('공지를 생성하였습니다.');
            res.json(util.successTrue(data.dataValues));
        })
        .catch(err => {
            console.log('공지를 생성할 수 없습니다.');
            res.json(util.successFalse(error.createErr()));
        })
    }else{
        console.log('로그인이 필요합니다.');
        res.json(util.successFalse(error.authErr()));
    }
}

// GET - /admin/post/manage 공지 관리 페이지
exports.managePost = (req, res) => {
    console.log('called managePost')

    models.Notice.findAll({
        attributes: ['id', 'title'],
        raw: true
    })
    .then(data => {
        //res.writeHead(200);
        //res.end(template.m_board(template.m_noticeList(result)));
        console.log(data);
        res.json(util.successTrue(data));
    })
    .catch(err=>{
        console.log('데이터를 불러올 수 없습니다.');
        res.json(util.successFalse(error.loadErr()));
    })
}

// GET - /admin/post/:postnum/update 공지 수정 페이지
exports.updatePost = (req, res) => {
    console.log('called updatePost');
    
    var _id = req.params.postnum;

    models.Notice.findAll({
      where : {id: _id},
      attributes: ['id', 'title', 'contents'],
      raw : true
  })
  .then(data=>{
    //   var _id = data[0].id;
    //   var _title = data[0].title;
    //   var _contents = data[0].contents;

    //   res.writeHead(200);
    //   res.end(template.m_edit(_id, _title, _contents));
    console.log(data);
    res.json(util.successTrue(data));
      
  })
  .catch(err=>{
      console.log('데이터를 불러올 수 없습니다.');
      res.json(util.successFalse(error.loadErr()));
  })
}



// PATCH - /admin/post/:postnum/uprocess 공지 수정 처리 프로세스 (권한 검사)
exports.updateProcess = (req, res) => { 
    console.log('called updateProcess')
    // 로그인 검사
    var isAdminStatus = util.isAdminStatus(req,res);
    // 로그인 시
    if (isAdminStatus) {
        var _id = req.params.postnum;
        var _contents = req.body.contents;

        models.Notice.update({
            contents: _contents
        }, { where: { id: _id } })
            .then(data => {
                console.log('공지를 수정하였습니다.');
                res.json(util.successTrue(message.updateMsg()));
                // res.writeHead(302, { Location: `/board/${_id}` });
                // res.end('success');
            })
            .catch(err => {
                console.log('공지를 수정할 수 없습니다.');
                res.json(util.successFalse(error.updateErr()));
            })
    } else{
        console.log('로그인이 필요합니다.');
        res.json(util.successFalse(error.authErr()));
    }
}

// DELETE - /admin/post/:postnum/dprocess 공지 삭제 처리 프로세스 (권한 검사)
exports.deleteProcess = (req, res) => {
    console.log('called deleteProcess')
    
    //console.log(req.session);
    // 로그인 검사
    var isAdminStatus = util.isAdminStatus(req,res);
    // 로그인 시
    if(isAdminStatus){

        var _id = req.params.postnum;
        
        models.Notice.destroy({
            where: { id: _id }
        })
        .then(data => {
            console.log('공지를 삭제하였습니다.');
            res.json(util.successTrue(message.deleteMsg()));
            // res.writeHead(302, { Location: '/manage/post' });
            // res.end('success')
        })
        .catch(err=>{
            console.log('공지를 삭제할 수 없습니다.');
            res.json(util.successFalse(error.deleteErr()));
        })
    } else{
        console.log('로그인이 필요합니다.');
        res.json(util.successFalse(error.authErr()));
    }
}
    

