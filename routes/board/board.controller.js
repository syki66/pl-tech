const util = require("../../middleware/util");
const models = require("../../models");
const template = require("../../lib/template");
const { concatSeries } = require("async");

// GET /board 공지 목록 출력
exports.noticeList = (req, res) => {
  console.log("called noticeList");
  models.Notice.findAll({
    attributes: ["id", "title", "cdate"],
    raw: true,
    order: [["id", "DESC"]],
    limit: 5,
  })
    .then((data) => {
      console.log(data);
      res.send(template.u_board(template.u_noticeList(data)));
    })
    .catch((err) => {
      console.log("데이터를 불러올 수 없습니다.");
      res.json(util.successFalse(err));
    });
};

// GET /board/:noticenum 해당 공지 내용 출력
exports.noticeContents = (req, res) => {
  console.log("called noticeContents");

  var page = "";
  if (req.query.pagenum) {
    page = "/more/" + req.query.pageNum;
  }
  models.Notice.findAll({
    where: { id: req.params.noticeNum },
    attributes: ["title", "contents", "cdate"],
    raw: true,
  })
    .then((data) => {
      console.log(data);
      var title = data[0].title;
      var contents = data[0].contents;
      var cdate = util.noticeCdate(data[0].cdate);
      res.send(template.u_notice(title, contents, cdate, page));
    })
    .catch((err) => {
      console.log("데이터를 불러올 수 없습니다.");
      res.json(util.successFalse(err));
    });
};

// GET /board/more/:pageNum 공지사항 더보기
exports.noticeMore = (req, res) => {
  console.log("called noticeMore");

  const pnum = req.params.pageNum;
  // 페이지당 3개씩
  const psize = 6;
  // 시작 페이지
  const bnum = (pnum - 1) * psize;

  models.Notice.findAll({
    attributes: ["id", "title", "cdate"],
    raw: true,
    order: [["id", "DESC"]],
    // bnum 부터 psize 만큼 데이터 조회
    limit: [bnum, psize],
  })
    .then((data) => {
      console.log(data);
      const list = template.c_noticeList(data, pnum, false);

      models.Notice.findAll({
        attributes: [[models.sequelize.fn("count", "*"), "count"]],
        raw: true,
      })
        .then((data) => {
          const pages = Math.ceil(data[0].count / psize);
          const ptemplate = template.c_pageBar(pnum, pages);
          res.send(template.c_board(list, ptemplate, false));
        })
        .catch((err) => {
          console.log(err);
          res.json(util.successFalse(err));
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(util.successFalse(err));
    });
};
