const util = require("../../middleware/util");
const models = require("../../models");
const board = require("../../lib/board");
const notice = require("../../lib/notice");
const { concatSeries } = require("async");
const { noticeListErrAlert } = require("../../values/alert");

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
      res.status(200);
      res.send(board.template(board.noticeList(data)));
      console.log("[DB] 공지사항 리스트 조회 성공");
    })
    .catch((err) => {
      res.status(500);
      res.send(template(noticeListErrAlert.msg, noticeListErrAlert.link));
      console.log(err);
      console.log("[DB] 공지사항 리스트 조회 실패");
    });
};

// GET /board/:noticenum 해당 공지 내용 출력
exports.noticeContents = (req, res) => {
  console.log("called noticeContents");

  var page = "";
  if (req.query.pagenum) {
    page = "/more/" + req.query.pageNum;
  }
  models.Notice.findOne({
    where: { id: req.params.noticeNum },
    attributes: ["title", "contents", "cdate"],
    raw: true,
  })
    .then((data) => {
      let { title, contents, cdate } = data;
      cdate = util.noticeCdate(cdate);
      res.status(200);
      res.send(notice.template(title, contents, cdate, page));
      console.log("[DB] 공지사항 리스트 조회 성공");
    })
    .catch((err) => {
      res.status(500);
      res.send(template(noticeListErrAlert.msg, noticeListErrAlert.link));
      console.log(err);
      console.log("[DB] 공지사항 리스트 조회 실패");
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
      const list = board.noticeList(data, pnum, false);
      console.log(data);
      models.Notice.findAll({
        attributes: [[models.sequelize.fn("count", "*"), "count"]],
        raw: true,
      })
        .then((data) => {
          console.log(data);
          const pages = Math.ceil(data[0].count / psize);
          const ptemplate = board.pageBar(pnum, pages);
          res.send(board.template(list, ptemplate, false));
        })
        .catch((err) => {
          res.status(500);
          res.send(template(noticeListErrAlert.msg, noticeListErrAlert.link));
          console.log(err);
          console.log("[DB] count 조회 실패");
        });
    })
    .catch((err) => {
      res.status(500);
      res.send(template(noticeListErrAlert.msg, noticeListErrAlert.link));
      console.log(err);
      console.log("[DB] 공지사항 리스트 조회 실패");
    });
};
