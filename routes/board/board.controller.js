const util = require('../../middleware/util');
const models = require('../../models');

function templateHTML(list){
return `
<!doctype html>
<html>
<head>
  <title> Notice </title>
  <meta charset="utf-8">
</head>
<body>
<h2>공지게시판</h2>
  ${list}
<a href="/writing">dd글작성</a>
</body>
</html>
`
}

function templateNotice(notice){
    return  `
    <!doctype html>
    <html>
    <head>
      <title> ${notice.title} </title>
      <meta charset="utf-8">
    </head>
    <body>
    <h2>공지게시판</h2>
      ${notice.contents}
    <a href="/update">수정</a>
    </body>
    </html>
    `
}

function templateList(filelist) {


    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="/notice/page?id=${filelist[i].id}">${filelist[i].title}</a></li>`;
      i = i + 1;
  
    }
    list = list + '</ul>';
  
    return list;
  }

// 전체 공지 리스트 표시
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
        var template = templateHTML(list);

        //res.writeHead(200);
        res.end(template);
    })

}

exports.noticeFigures = (req, res)=>{
    console.log('called noticeFigures');

    console.log(req)
    // var result = models.Notice.findAll({
    //     where:{
    //         id : req.params.id
    //     },
    //     attributes : ['title','contents'],
    //     raw: true
    // })
    // .then(result=>{
    //     var notice = result[0];
    //     var template = templateNotice(notice);
        
    //     res.end(template);
    // });

    
    
}

exports.updateNotice = (req,res) =>{
    console.log('called updateNotice');

}

exports.writingFigures = (req, res) => {
    console.log('called writingFigures');
    res.render('../views/writing.html');
}

exports.createNotice = (req, res) =>{
    var body = req.body;
    var _title = body.title;
    var _contents = body.contents;
    
    models.Notice.create({
        title: _title,
        contents : _contents
    })
    .then(result=>{
        console.log(result);
        res.writeHead(302, {Location : '/notice'});
        res.end('success')
    })
    .catch(err=>{
        console.error(err);
    })

}

