const util = require('../../middleware/util');
const models = require('../../models');

// 공지사항 템플릿
function template_notice(_title, _contents){
return `
<!doctype html>
<html>
<head>
  <title> Notice </title>
  <meta charset="utf-8">
</head>
<body>
<h2>${_title}</h2>
  ${_contents}
<p><a href="/board">홈으로 돌아가기</a></p>
</body>
</html>
`}

// 게시판 템플릿
function template_board(list){
  return `
  <!doctype html>
  <html>
  <head>
    <title> Notice </title>
    <meta charset="utf-8">
  </head>
  <body>
  <h2>공지사항 게시판</h2>
    ${list}
  <a href="/manage">관리자 설정</a>
  </body>
  </html>
  `}

// 공지사항 목록
function templateList(filelist) {
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="/board/${filelist[i].id}">${filelist[i].title}</a></li>`;
      i = i + 1;
  
    }
    list = list + '</ul>';
  
    return list;
  }

// 전체 공지 목록 표시
exports.boardFigures = (req, res) =>{
    console.log('called boardFigures');
    //res.render('../views/notice.html');

    models.Notice.findAll({
        attributes: ['id','title'],
        raw : true
    })
    .then(result=>{
        console.log(result);
        var list = templateList(result);
        var template = template_board(list);

        //res.writeHead(200);
        res.end(template);
    })

}

// 공지사항 페이지 표시
exports.noticeFigures = (req, res)=>{
    console.log('called noticeFigures');

    var _id = req.params.page;

    console.log(_id);
    models.Notice.findAll({
      where : {id: _id},
      attributes: ['title', 'contents'],
      raw : true
  })
  .then(result=>{
      console.log(result);
      var _title = result[0].title;
      var _contents = result[0].contents;
      var template = template_notice(_title, _contents);

      //res.writeHead(200);
      res.end(template);
  })
}

