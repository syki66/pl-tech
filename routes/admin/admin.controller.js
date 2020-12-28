const inputController = require("../input/input.controller");
const util = require("../../middleware/util");
const models = require("../../models");
const template = require("../../lib/template");
const error = require("../../lib/error");
const message = require("../../lib/message");
const errorHandler = require("errorhandler");
const fs = require("fs");
const { nextTick } = require("process");

// /admin 접근 권한 검사 - 세션 만료시 경고 메세지
exports.authCheck = (req, res, next) => {
  console.log("called authCheck");
  const isAdminStatus = util.isAdminStatus(req, res);
  if(isAdminStatus){
    next();
  }else{
    res.redirect("/alert/auth");
  }
}

// GET - /admin 관리자 페이지
exports.admin = (req, res) => {
  console.log("called admin");
  res.render("../views/admin.html");
};

// GET - /admin/notice 공지 생성 페이지
exports.createNotice = (req, res) => {
  console.log("called createNotice");
  res.render("../views/writing.html");
};

// POST - /admin/notice/cprocess 공지 생성 처리 프로세스 
exports.createProcess = (req, res) => {
  console.log("called createProcess");

  models.Notice.create({
    title: req.body.title,
    contents: req.body.contents,
    cdate: util.currentDate(),
  })
    .then((data) => {
      console.log(data.dataValues);
      console.log("공지를 생성하였습니다.");
      inputController.updateNoticeObj();
      res.writeHead(302, { Location: "/alert/create" });
      res.end("success");
    })
    .catch((err) => {
      console.log(err);
      res.json(util.successFalse(err));
    });
  
};

// GET - /admin/notice/manage 공지 관리 페이지
exports.manageNotice = (req, res) => {
  console.log("called manageNotice");
  
  const pnum = req.params.pageNum
  // 페이지당 6개씩
  const psize = 6;
  // 시작 페이지
  const begin = (pnum - 1) * psize;

  models.Notice.findAll({
    attributes: ["id", "title", "cdate"],
    raw: true,
    order: [["id", "DESC"]], 
    // begin 부터 psize 만큼 데이터 조회
    limit: [begin, psize]
  })
    .then((data) => {
      console.log(data);
      const list = template.c_noticeList(data, pnum, true);

      models.Notice.findAll({
        attributes: [[models.sequelize.fn("count", "*"), "count"]],
        raw: true
      })
        .then((data) => {
          const pages = Math.ceil(data[0].count / psize);
          const pageBar = template.c_pageBar(pnum, pages);
          res.send(template.c_board(list, pageBar, true));
        })
        .catch((err) => {
          console.log(err);
          es.json(util.successFalse(err));
        })
    })
    .catch((err) => {
      console.log(err);
      res.json(util.successFalse(err));
    })
};

// GET - /admin/notice/:noticeNum/update 공지 수정 페이지
exports.updateNotice = (req, res) => {
  console.log("called updateNotice");

  const pnum = req.query.pageNum;

  models.Notice.findAll({
    where: { id: req.params.noticeNum },
    attributes: ["id", "title", "contents"],
    raw: true,
  })
    .then((data) => {
      console.log(data);
      res.send(template.a_edit(data[0].id, data[0].title, data[0].contents, pnum));
    })
    .catch((err) => {
      console.log("데이터를 불러올 수 없습니다.");
      res.json(util.successFalse(err));
    });
};

// PATCH - /admin/notice/:noticeNum/uprocess 공지 수정 처리 프로세스 
exports.updateProcess = (req, res) => {
  console.log("called updateProcess");

  const pnum = req.body.pageNum;

  models.Notice.update(
    {
      title: req.body.title,
      contents: req.body.contents,
      cdate: util.currentDate(),
    },
    { where: { id: req.params.noticeNum } }
  )
    .then((data) => {
      console.log("공지를 수정하였습니다.");
      inputController.updateNoticeObj();
      res.writeHead(302, { Location: "/alert/update" });
      res.end("success");
    })
    .catch((err) => {
      console.log("공지를 수정할 수 없습니다.");
      res.json(util.successFalse(err));
    });
};

// DELETE - /admin/notice/:noticeNum/dprocess 공지 삭제 처리 프로세스
exports.deleteProcess = (req, res) => {
  console.log("called deleteProcess");

  const pnum = req.body.pageNum;

  models.Notice.destroy({
    where: { id: req.params.noticeNum },
  })
    .then((data) => {
      console.log("공지를 삭제하였습니다.");
      inputController.updateNoticeObj();
      res.writeHead(302, { Location: "/alert/delete" });
      res.end("success");
    })
    .catch((err) => {
      console.log("공지를 삭제할 수 없습니다.");
      res.json(util.successFalse(err));
    });
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
    res.writeHead(302, { Location: "/alert/welcome"});
    res.end("success");
  }
};

exports.slide = (req, res) => {
  console.log("called slide");
  fs.readdir("./views/src/pages", function(error, filelist){
    var list = util.rmExtention(filelist);
    res.send(template.a_slide(template.a_checkList(list)));
  })

}

exports.slideObj = [];
exports.inputSlide = (req, res) => {
  console.log("called inputSlide");

  checkList = req.body.checkResult.split(',');

  this.slideObj = [];
  for (let i = 0; i < checkList.length; i++) {
    this.slideObj[i] = checkList[i];
  }
  inputController.updateInputData();
  res.writeHead(302, { Location: "/alert/slide"});
  res.end("success");
}

exports.worker = (req, res) => {
  console.log("called worker");
  fs.readdir("./worker", function(error, filelist){
    const leader = "leader";
    const staff1 = "staff1";
    const staff2 = "staff2";
    const staff3 = "staff3";
    const dStaff = "dStaff";
    res.send(template.a_workerManage(
      template.a_workerList(dStaff, filelist),
      template.a_workerList(leader, filelist),
      template.a_workerList(staff1, filelist),
      template.a_workerList(staff2, filelist),
      template.a_workerList(staff3, filelist)));
  })
};


exports.workerObj = [null, null, null, null];
exports.inputWorker = (req, res) => {
  console.log("called inputWorker");
  if (req.body === null || req.body === undefined) {
    res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
  } else {
    console.log(req.body);
    var i = 0;
    for (var j in req.body) {
      const image = req.body[j];
      const element = image.split('-');
      const dep = element[0];
      const rank = element[1];
      const name = element[2].split('.')[0];
      this.workerObj[i] = [dep, image, rank, name];
      console.log(this.workerObj[i]);
      i = i + 1;
    }
    inputController.updateInputData();
    res.redirect("/alert/worker");
  }
};

exports.uploadWorker = (req, res) => {
  console.log("called uploadWorker");
  console.log(req.file);
  res.redirect("/alert/worker/upload");
}

exports.deleteWorker = (req, res) => {
  console.log("called deleteWorker");
  const dir = "./worker/"
  fs.unlink(dir + req.body.dStaff, (err) => {
    if(err) {
      res.redirect("/alert/worker/warn");
      return false;
    } else {
      for(let i = 0; i < this.workerObj.length; i++){
        if(this.workerObj[i] === req.body.dStaff){
          this.workerObj[i] = null;
          break;
        }
      }
      inputController.updateInputData();
      res.redirect("/alert/worker/delete");
    }
  });
}

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