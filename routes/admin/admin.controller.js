const inputController = require("../input/input.controller");
const util = require("../../middleware/util");
const models = require("../../models");
const template = require("../../lib/template");
const error = require("../../lib/error");
const message = require("../../lib/message");
const errorHandler = require("errorhandler");
const fs = require("fs");

// GET - /admin 관리자 페이지
exports.admin = (req, res) => {
  // 관리자 페이지 UI
  console.log("called admin");
  res.render("../views/admin.html");
};

// GET - /admin/post 공지 생성 페이지
exports.createPost = (req, res) => {
  // 공지 생성 UI
  console.log("called createPost");
  res.render("../views/writing.html");
};

// POST - /admin/post/cprocess 공지 생성 처리 프로세스 (권한 검사)
exports.createProcess = (req, res) => {
  console.log("called createProcess");

  // 로그인 검사
  var isAdminStatus = util.isAdminStatus(req, res);

  if (isAdminStatus) {
    var body = req.body;
    var _title = body.title;
    var _contents = body.contents;
    var _cdate = util.currentDate();

    models.Notice.create({
      title: _title,
      contents: _contents,
      cdate: _cdate,
    })
      .then((data) => {
        console.log(data.dataValues);
        console.log("공지를 생성하였습니다.");
        res.redirect(`/admin/post/manage/1`);
        //res.json(util.successTrue(data.dataValues));
      })
      .catch((err) => {
        console.log("공지를 생성할 수 없습니다.");
        res.json(util.successFalse(err));
      });
  } else {
    console.log("로그인이 필요합니다.");
    res.json(util.successFalse(error.authErr()));
  }
};

// GET - /admin/post/manage 공지 관리 페이지
exports.managePost = (req, res) => {
  console.log("called managePost");

  const pagenum = req.params.pagenum
  // 페이지당 3개씩
  const psize = 6;
  // 시작 페이지
  const bnum = (pagenum - 1) * psize;
  
models.Notice.findAll({
  attributes: ["id", "title"],
  raw: true,
  order: [["id", "DESC"]],
  // bnum 부터 psize 만큼 데이터 조회
  limit : [bnum, psize]
})
  .then((data) => {
    console.log(data);
    const list = template.m_noticeList(data, pagenum, true);

    models.Notice.findAll({
      attributes: [[models.sequelize.fn("count", "*"), "count"]],
      raw: true
    })
    .then((data)=>{
        const pages = data[0].count / psize;  
        const ptemplate = template.ptmpl(pages);
        res.send(template.m_board(list,ptemplate,true));
    })
    .catch((err)=>{
        console.log(err);
    })
  })
  .catch((err) => {
    console.log(err);
    res.json(util.successFalse(error));
  })
};

// GET - /admin/post/:postnum/update 공지 수정 페이지
exports.updatePost = (req, res) => {
  console.log("called updatePost");

  const _id = req.params.postnum;

  const page = req.query.pagenum;

  models.Notice.findAll({
    where: { id: _id },
    attributes: ["id", "title", "contents"],
    raw: true,
  })
    .then((data) => {
      console.log(data);
      const id = data[0].id;
      const title = data[0].title;
      const contents = data[0].contents;
      res.send(template.m_edit(id, title, contents, page));
    })
    .catch((err) => {
      console.log("데이터를 불러올 수 없습니다.");
      res.json(util.successFalse(error.loadErr()));
    });
};

// PATCH - /admin/post/:postnum/uprocess 공지 수정 처리 프로세스 (권한 검사)
exports.updateProcess = (req, res) => {
  console.log("called updateProcess");
  // 로그인 검사
  var isAdminStatus = util.isAdminStatus(req, res);
  // 로그인 시
  if (isAdminStatus) {
    const _id = req.params.postnum;
    const _title = req.body.title;
    const _contents = req.body.contents;
    const _cdate = util.currentDate();
    const page = req.body.page;

    models.Notice.update(
      {
        title: _title,
        contents: _contents,
        cdate: _cdate,
      },
      { where: { id: _id } }
    )
      .then((data) => {
        console.log("공지를 수정하였습니다.");
        res.writeHead(302, { Location: `/admin/post/manage/${page}` });
        res.end("success");
      })
      .catch((err) => {
        console.log("공지를 수정할 수 없습니다.");
        res.json(util.successFalse(error.updateErr()));
      });
  } else {
    console.log("로그인이 필요합니다.");
    res.json(util.successFalse(error.authErr()));
  }
};

// DELETE - /admin/post/:postnum/dprocess 공지 삭제 처리 프로세스 (권한 검사)
exports.deleteProcess = (req, res) => {
  console.log("called deleteProcess");
  const pagenum = req.body.pagenum;
  console.log(pagenum);
  // 로그인 검사
  var isAdminStatus = util.isAdminStatus(req, res);
  // 로그인 시
  if (isAdminStatus) {
    var _id = req.params.postnum;

    models.Notice.destroy({
      where: { id: _id },
    })
      .then((data) => {
        console.log("공지를 삭제하였습니다.");
        //res.json(util.successTrue(message.deleteMsg()));
        res.writeHead(302, { Location: `/admin/post/manage/${pagenum}` });
        res.end("success");
      })
      .catch((err) => {
        console.log("공지를 삭제할 수 없습니다.");
        res.json(util.successFalse(error.deleteErr()));
      });
  } else {
    console.log("로그인이 필요합니다.");
    res.json(util.successFalse(error.authErr()));
  }
};

exports.welcome = (req, res) => {
  console.log("called welcome");

  res.render("../views/welcome.html");
};

exports.welcomeObj = [null, null];

exports.inputWelcome = (req, res) => {
  console.log("called inputWelcome");
  if (req.body === null || req.body === undefined) {
    res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
  } else {
    exports.welcomeObj = [req.body.visitor, req.body.sentence];
    inputController.updateInputData();
    // res.json(util.successTrue(this.welcome, '환영문구가 성공적으로 반영되었습니다.'));
    res.redirect("/alert/welcome");
  }
};


exports.workerManage = (req, res) => {
  console.log("called wboardManage");

  fs.readdir('./worker', function(error, filelist){
    var list = util.pictureParser(filelist);
    res.send(template.m_wboardManage(
      template.m_workerList('leader',list),
      template.m_workerList('staff1',list),
      template.m_workerList('staff2',list),
      template.m_workerList('staff3',list)));
  })
};


exports.workerObj = [null, null, null, null];
exports.inputWorker = (req, res) => {
  console.log("called wboardManage");
  if (req.body === null || req.body === undefined) {
    res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
  } else {
    exports.workerObj = [req.body.leader, req.body.staff1, req.body.staff2, req.body.staff3];
    inputController.updateInputData();
    res.redirect("/alert");
  }
};

exports.safety = (req, res) => {
  console.log("called safety");

  res.render("../views/safety.html");
};

exports.safetyObj = [
  null,
  null,
  null,
  null,
  null,
  null
 ]; 

// function calcNow() {
//   let today = new Date();   
//   let year = today.getFullYear(); // 년도
//   let monthNow = today.getMonth() + 1;  // 월
//   let date = today.getDate();  // 날짜

//   if(monthNow < 10){
//     monthNow = "0" + monthNow;
//   }
  
//   if(date < 10){
//     date = "0" + date;
//   }

//   return year + '년 ' + monthNow + '월 ' + date + '일';
// }


function calcSafety(zhVal, startDate, targetDate) {

  if (startDate === null || targetDate === null) {
    exports.safetyObj = [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-"
     ];
     inputController.updateInputData();
  } else {
    
    let yyStart = startDate.substring(0, 4);
    let yyTarget = targetDate.substring(0, 4);
    let mmStart;
    let mmTarget;
    let ddStart;
    let ddTarget;

    if(startDate.substring(6, 7) === '0'){
      mmStart = startDate.substring(7, 8);
    } else {
      mmStart = startDate.substring(6, 8);
    }

    if(targetDate.substring(6, 7) === '0'){
      mmTarget = targetDate.substring(7, 8);
    } else {
      mmTarget = targetDate.substring(6, 8);
    }

    if(startDate.substring(10, 11) === '0'){
      ddStart = startDate.substring(11, 12);
    } else {
      ddStart = startDate.substring(10, 12);
    }

    if(targetDate.substring(10, 11) === '0'){
      ddTarget = targetDate.substring(11, 12);
    } else {
      ddTarget = targetDate.substring(10, 12);
    }

    let start = new Date(yyStart, mmStart, ddStart);
    
    let target = new Date(yyTarget, mmTarget, ddTarget);    // D-day(2017년 8월 30일)를 셋팅한다.
    let now = new Date();                    // 현재(오늘) 날짜를 받아온다.

    let yyNow = now.getFullYear(); // 년도
    let mmNow = now.getMonth() + 1;  // 월
    let ddNow = now.getDate();  // 날짜

    if (mmNow < 10) {
      mmNow = "0" + mmNow;
    }

    if (ddNow < 10) {
      ddNow = "0" + ddNow;
    }

    let ymdNow = yyNow + '년 ' + mmNow + '월 ' + ddNow + '일';

    let stGap = start.getTime() - target.getTime();    // 현재 날짜에서 D-day의 차이를 구한다.
    let stResult = Math.floor(stGap / (1000 * 60 * 60 * 24)) * -1;    // gap을 일(밀리초 * 초 * 분 * 시간)로 나눈다. 이 때 -1 을 곱해야 날짜차이가 맞게 나온다.

    let snGap = start - now.getTime();
    let snResult = Math.floor(snGap / (1000 * 60 * 60 * 24)) * -1;

    exports.safetyObj = [
      snResult,
      ymdNow,
      zhVal,
      stResult,
      startDate,
      targetDate
     ];
     inputController.updateInputData();
  }
}

setInterval(()=>{
  calcSafety(this.safetyObj[2], this.safetyObj[4], this.safetyObj[5])
}, 10000)

exports.inputSafety = (req, res) => {
  console.log("called inputSafety");
  if (req.body === null || req.body === undefined) {
    res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
  } else {
    console.log(req.body);
    calcSafety(req.body.zeroHazard, req.body.startDate, req.body.targetDate);
    res.redirect("/alert");
  }
};