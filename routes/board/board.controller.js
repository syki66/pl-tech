const util = require('../../middleware/util');
const models = require('../../models');
const template = require('../../lib/template.js');


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
        var list = template.noticeList(result);

        //res.writeHead(200);
        res.end(template.board(list));
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

      //res.writeHead(200);
      res.end(template.notice(_title, _contents));
  })
}

