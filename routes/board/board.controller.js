const util = require('../../middleware/util');
const models = require('../../models');
const error = require('../../lib/error');
const template = require('../../lib/template');
const { concatSeries } = require('async');

// GET /board 공지 목록 출력
exports.postList = (req, res) =>{
    console.log('called postList');
    //res.render('../views/notice.html');

    models.Notice.findAll({
        attributes: ['id','title', 'cdate'],
        raw : true,
        order : [['id', 'DESC']],
        limit : 5
    })
    .then(data=>{
        console.log(data);
        var list = template.noticeList(data);
        res.send(template.board(list));
        //res.json(util.successTrue(data));
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

    const _id = req.params.postnum;
    var page ="";
    if(req.query.pagenum){
        page = "/more/" + req.query.pagenum;
    }
    //console.log(_id);
    models.Notice.findAll({
      where : {id: _id},
      attributes: ['title', 'contents', 'cdate'],
      raw : true
  })
  .then(data=>{

      console.log(data);
      var title = data[0].title;
      var contents = data[0].contents;
      var cdate = util.noticeCdate(data[0].cdate);
      res.send(template.notice(title, contents, cdate, page));
      //res.json(util.successTrue(data));
  })
  .catch(err=>{
      console.log('데이터를 불러올 수 없습니다.');
      res.json(util.successFalse(error.loadErr()));
  })
}

// GET /board/more/:pagenum 공지사항 더보기
exports.noticeMore = (req, res) =>{
    console.log("called noticeMore");

    const pnum = req.params.pagenum
    // 페이지당 3개씩
    const psize = 6;
    // 시작 페이지
    const bnum = (pnum - 1) * psize;
    
  models.Notice.findAll({
    attributes: ["id", "title"],
    raw: true,
    order: [["id", "DESC"]],
    // bnum 부터 psize 만큼 데이터 조회
    limit : [bnum, psize]
  })
    .then((data) => {
      console.log(data);
      const list = template.m_noticeList(data, pnum, false);

      models.Notice.findAll({
        attributes: [[models.sequelize.fn("count", "*"), "count"]],
        raw: true
      })
      .then((data)=>{
          const pages = data[0].count / psize;  
          const ptemplate = template.ptmpl(pages);
          res.send(template.m_board(list,ptemplate,false));
      })
      .catch((err)=>{
          console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
      res.json(util.successFalse(error));
    })
}

