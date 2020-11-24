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
<a href="notice/writing">글작성</a>
</body>
</html>
`
}

function templateList(filelist) {


    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="/?title=${filelist[i].title}">${filelist[i].title}</a></li>`;
      i = i + 1;
  
    }
    list = list + '</ul>';
  
    return list;
  }

exports.inputFigures = (req, res) =>{
    console.log('called inputFigures');
    //res.render('../views/notice.html');

    models.Notice.findAll({
        attributes: ['title'],
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

exports.writingFigures = (req, res) => {
    console.log('called writingFigures');
    res.render('../views/writing.html');
}

exports.parsingFigures = (req, res) =>{
    var body = req.body;
    var _title = body.title;
    var _contents = body.contents;
    
    models.Notice.create({
        title: _title,
        contents : _contents
    })
    .then(result=>{
        console.log(result);
        res.writeHead(301, {Location : '/notice'});
        res.end('success')
    })
    .catch(err=>{
        console.error(err);
    })

}

