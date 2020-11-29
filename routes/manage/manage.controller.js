const util = require('../../middleware/util');
const models = require('../../models');


function templateHTML(list) {
    return `
    <!doctype html>
    <html>
    <head>
      <title> Notice </title>
      <meta charset="utf-8">
    </head>
    <body>
    <h2>공지사항 글 관리</h2>
      ${list}
    </body>
    </html>
    `
}

function templateList(datalist) {

    var list = '<ul>';
    var i = 0;
    while (i < datalist.length) {
        list = list + `<li><a href="/manage/newnotice/${datalist[i].id}">${datalist[i].title}</a>
          <form action="/manage/newnotice/delete_process" method="post">
              <input type="hidden" name="id" value="${datalist[i].id}">
              <input type="submit" value="삭제">
             </form></li>`;
        i = i + 1;

    }
    list = list + '</ul>';

    return list;
}

function template_edit(_id, _title, _contents) {
    return `
    <!doctype html>
    <html>
    <head>
      <title> Edit </title>
      <meta charset="utf-8">
    </head>
    <body>
    <form action ="/manage/newnotice/update_process" method="post"> 
    <input type="hidden" name="id" value="${_id}"> 
    
      <h2>${_title}</h2>
      <p><textarea name="contents">${_contents}</textarea></p>
      <p><input type="submit" value="수정"></p>
    </form>
    </body>
    </html>
    `
}

// 관리자 설정 페이지 표시
exports.manageFigures = (req, res) => {
    console.log('called manageFigures')

    res.render('../views/manage.html');

}

// 글 작성 페이지 표시
exports.newnoticeFigures = (req, res) => {
    console.log('called newnoticeFigures')
    res.render('../views/writing.html');
}

// 글 수정 페이지 표시
exports.editFigures = (req, res) => {
    console.log('called editFigures');
    
    var _id = req.params.page;

    models.Notice.findAll({
      where : {id: _id},
      attributes: ['id', 'title', 'contents'],
      raw : true
  })
  .then(result=>{
      var _id = result[0].id;
      var _title = result[0].title;
      var _contents = result[0].contents;
      console.log(_title);
      var template = template_edit(_id, _title, _contents);

      //res.writeHead(200);
      res.end(template);
  })
}

// 글 생성 처리 프로세스
exports.createNotice = (req, res) => {
    console.log('called createNotice')

    var body = req.body;
    var _title = body.title;
    var _contents = body.contents;

    models.Notice.create({
        title: _title,
        contents: _contents
    })
        .then(result => {
            console.log(result);
            res.writeHead(302, { Location: '/board' });
            res.end('success')
        })
        .catch(err => {
            console.error(err);
        })
}

// 글 수정 처리 프로세스
exports.updateNotice = (req, res) => {
    console.log('called updateNotice')
    console.log(req.body);

    var _id = req.body.id;
    var _contents = req.body.contents;
    models.Notice.update({contents: _contents}, {where : { id : _id}})
    .then(result=>{
        res.writeHead(302, { Location: `/board/${_id}` });
        res.end('success');
    })
}

// 글 삭제 처리 프로세스
exports.deleteNotice = (req, res) => {
    console.log('called deleteNotice')

    console.log(req.body.id);

    var _id = req.body.id;

    models.Notice.destroy({
        where: { id: _id }
    })
        .then(result => {
            res.writeHead(302, { Location: '/manage/post' });
            res.end('success')
        })
}

// 글 관리 페이지
exports.postFigures = (req, res) => {
    console.log('called postFigures')

    models.Notice.findAll({
        attributes: ['id', 'title'],
        raw: true
    })
        .then(result => {
            console.log(result);
            var list = templateList(result);
            var template = templateHTML(list);

            //res.writeHead(200);
            res.end(template);
        })
}
