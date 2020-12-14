const util = require('../../middleware/util');
const models = require('../../models');
const error = require('../../lib/error');
const template = require('../../lib/template');

// GET /board 공지 목록 출력
exports.postList = (req, res) =>{
    console.log('called postList');
    //res.render('../views/notice.html');

    models.Notice.findAll({
        attributes: ['id','title', 'cdate'],
        raw : true
    })
    .then(data=>{
<<<<<<< HEAD
        //console.log(data);
        //var list = template.noticeList(result);
        //res.writeHead(200);
        data[0].cdate = util.cdateParser(data);
        res.json(util.successTrue(data));
=======
        console.log(data);
        var list = template.noticeList(data);
        res.send(template.board(list));
        //res.json(util.successTrue(data));
>>>>>>> 76cfef724e0096a4b0c6c4e6a73c6c9a46323315
    })
    .catch(err=>{
        console.log('데이터를 불러올 수 없습니다.');
        console.log(err);
        res.json(util.successFalse(error.loadErr()));
    })

}

// GET /board/:postnum 해당 공지 내용 출력
exports.postContents = (req, res)=>{
    console.log('called postContents');

    var _id = req.params.postnum;

    //console.log(_id);
    models.Notice.findAll({
      where : {id: _id},
      attributes: ['title', 'contents', 'cdate'],
      raw : true
  })
  .then(data=>{
      console.log(data);
      res.json(util.successTrue(data));
  })
  .catch(err=>{
      console.log('데이터를 불러올 수 없습니다.');
      res.json(util.successFalse(error.loadErr()));
  })
}

