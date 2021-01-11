const util = require("../../middleware/util");
const models = require("../../models");
const board = require("../../lib/board");
const notice = require("../../lib/notice");
const worker = require("../../lib/worker");
const slide = require("../../lib/slide");
const slideValues = require("../../values/slide");
const objects = require("../../values/objects");
const produce = require("../../values/produce");
const { template } = require("../../lib/alert");
const {
  authAlert,
  createAlert,
  createErrAlert,
  noticeListErrAlert,
  updateAlert,
  updateErrAlert,
  updateNoticeObjErrAlert,
  deleteAlert,
  deleteErrAlert,
  welcomeAlert,
  startDateAlert,
  targetDateAlert,
  safetyAlert,
  filelistErrAlert,
  workerInputAlert,
  workerUploadAlert,
  workerDeleteAlert,
  slideCheckAlert,
  slideAlert,
  lotationAlert,
  newsAlert,
} = require("../../values/alert");
const fs = require("fs");

// /admin 접근 권한 검사 - 세션 만료시 경고 메세지
exports.authCheck = (req, res, next) => {
  console.log("called authCheck");
  const isAdminStatus = util.isAdminStatus(req, res);
  if (isAdminStatus) {
    next();
  } else {
    res.status(401);
    res.send(template(authAlert.msg, authAlert.link));
  }
};

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
  const valErr = req.valErr;

  if (valErr) {
    res.status(400);
    res.send(template(valErr[0].msg, "/admin/notice"));
    util.printValErr(valErr);
  } else {
    const { title, contents } = req.body;
    models.Notice.create({
      title: title,
      contents: contents,
      cdate: util.currentDate(),
    })
      .then((data) => {
        updateNoticeObj(2);
        res.status(201);
        res.send(template(createAlert.msg, createAlert.link));
        console.log("[DB] 공지사항 생성 성공");
      })
      .catch((err) => {
        res.status(500);
        res.send(template(createErrAlert.msg, createErrAlert.link));
        console.log(err);
        console.log("[DB] 공지사항 생성 실패");
      });
  }
};

// GET - /admin/notice/manage/:pageNum 공지 관리 페이지
exports.manageNotice = (req, res) => {
  console.log("called manageNotice");
  const valErr = req.valErr;

  if (valErr) {
    res.status(400);
    res.send(template(valErr[0].msg, "/admin/notice"));
    util.printValErr(valErr);
  } else {
    const pnum = req.params.pageNum;
    // 페이지당 6개씩
    const psize = 6;
    // 시작 페이지
    const begin = (pnum - 1) * psize;

    let query1 = models.Notice.findAll({
      attributes: ["id", "title", "cdate"],
      raw: true,
      order: [["id", "DESC"]],
      limit: [begin, psize],
    });

    let query2 = models.Notice.findAll({
      attributes: [[models.sequelize.fn("count", "*"), "count"]],
      raw: true,
    });

    Promise.all([query1, query2])
      .then((data) => {
        let notices = data[0];
        let { count } = data[1][0];

        const list = board.noticeList(notices, pnum, true);
        const pages = Math.ceil(count / psize);
        const pageBar = board.pageBar(pnum, pages);
        res.status(200);
        res.send(board.template(list, pageBar, true));
        console.log("[DB] 공지사항 리스트 조회 성공");
      })
      .catch((err) => {
        res.status(500);
        res.send(template(noticeListErrAlert.msg, noticeListErrAlert.link));
        console.log(err);
        console.log("[DB] 공지사항 리스트 조회 실패");
      });
  }
};

// GET - /admin/notice/:noticeNum/update 공지 수정 페이지
exports.updateNotice = (req, res) => {
  console.log("called updateNotice");

  const pnum = req.query.pageNum;

  models.Notice.findOne({
    where: { id: req.params.noticeNum },
    attributes: ["id", "title", "contents"],
    raw: true,
  })
    .then((data) => {
      let { id, title, contents } = data;
      res.status(200);
      res.send(notice.edit(id, title, contents, pnum));
      console.log("[DB] 수정 대상 공지사항 조회 성공");
    })
    .catch((err) => {
      let UEA = updateErrAlert(req.params.noticeNum);
      res.status(500);
      res.send(template(UEA.msg, UEA.link));
      console.log(err);
      console.log("[DB] 수정 대상 공지사항 조회 실패");
    });
};

// 공지사항 생성 및 삭제시 업데이트
const updateNoticeObj = (noticeNum) => {
  models.Notice.findAll({
    attributes: ["id", "title", "cdate"],
    raw: true,
    order: [["id", "DESC"]],
    limit: 5,
  })
    .then((data) => {
      let row;
      for (let i = 0; i < objects.noticeObj.length; i++) {
        if (data[i]) {
          let cdate =
            data[i].cdate.substring(5, 7) +
            "/" +
            data[i].cdate.substring(8, 10);
          let day = data[i].cdate.substring(11, 12);
          row = [cdate, day, data[i].title, String(data[i].id)];
        } else {
          row = null;
        }
        objects.noticeObj[i] = row;
        produce.values = slideValues.valuesToJson(
          objects.parsedObj,
          objects.welcomeObj,
          objects.noticeObj,
          objects.safetyObj,
          objects.workerObj,
          objects.slideObj
        );
        objects.updateObjects();
      }
    })
    .catch((err) => {
      let UNEA = updateNoticeObjErrAlert(noticeNum);
      res.status(500);
      res.send(template(UNEA.msg, UNEA.link));
      console.log(err);
      console.log("[DB] 수정 대상 공지사항 조회 실패");
    });
};

// PATCH - /admin/notice/:noticeNum/uprocess 공지 수정 처리 프로세스
exports.updateProcess = (req, res) => {
  console.log("called updateProcess");

  const valErr = req.valErr;
  let { noticeNum } = req.params;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, `/admin/notice/${noticeNum}/update`));
  } else {
    models.Notice.update(
      {
        title: req.body.title,
        contents: req.body.contents,
        cdate: util.currentDate(),
      },
      { where: { id: noticeNum } }
    )
      .then((data) => {
        updateNoticeObj(noticeNum);
        res.status(200);
        res.send(template(updateAlert.msg, updateAlert.link));
        console.log("[DB] 공지사항 수정 성공");
      })
      .catch((err) => {
        let UEA = updateErrAlert(noticeNum);
        res.status(500);
        res.send(template(UEA.msg, UEA.link));
        console.log(err);
        console.log("[DB] 공지사항 수정 실패");
      });
  }
};

// DELETE - /admin/notice/:noticeNum/dprocess 공지 삭제 처리 프로세스
exports.deleteProcess = (req, res) => {
  console.log("called deleteProcess");
  const pnum = req.body.pageNum;
  console.log(pnum);
  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, `/admin/notice/manage/${pnum}`));
  } else {
    models.Notice.destroy({
      where: { id: req.params.noticeNum },
    })
      .then((data) => {
        updateNoticeObj(req.params.noticeNum);
        let DA = deleteAlert(pnum);
        res.status(200);
        res.send(template(DA.msg, DA.link));
        console.log("[DB] 공지사항 삭제 성공");
      })
      .catch((err) => {
        let DEA = deleteErrAlert(pnum);
        res.status(500);
        res.send(template(DEA.msg, DEA.link));
        console.log(err);
        console.log("[DB] 공지사항 삭제 실패");
      });
  }
};

exports.welcome = (req, res) => {
  console.log("called welcome");
  res.render("../views/welcome.html");
};

exports.inputWelcome = (req, res) => {
  console.log("called inputWelcome");

  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, `/admin/welcome`));
  } else {
    let { visitor, sentence } = req.body;
    visitor += "님";
    objects.welcomeObj = [visitor, sentence];
    objects.updateObjects();
    res.status(200);
    res.send(template(welcomeAlert.msg, welcomeAlert.link));
    console.log("환영문구 적용 성공");
  }
};

exports.safety = (req, res) => {
  console.log("called safety");
  res.render("../views/safety.html");
};

exports.inputSafety = (req, res) => {
  console.log("called inputSafety");

  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, `/admin/safety`));
  } else {
    const moment = require("moment");
    require("moment-timezone");
    moment.tz.setDefault("Asia/Seoul");

    // 현재 날짜
    let date = moment().format("YYYY년 MM월 DD일");
    let { zeroHazard, startDate, targetDate } = req.body;
    // 시작 날짜 > 현재 날짜
    if (startDate > date) {
      res.status(400);
      res.send(template(startDateAlert.msg, startDateAlert.link));
    } // 목표날짜 < 현재 날짜
    else if (targetDate < date) {
      res.status(400);
      res.send(template(targetDateAlert.msg, targetDateAlert.link));
    } else {
      console.log(zeroHazard);
      console.log(startDate);
      console.log(targetDate);

      objects.calcSafety(zeroHazard, startDate, targetDate);
      res.status(200);
      res.send(template(safetyAlert.msg, safetyAlert.link));
      console.log("무재해 기록판 적용 성공");
    }
  }
};

exports.worker = (req, res) => {
  console.log("called worker");
  fs.readdir("./worker", function (err, filelist) {
    if (!err) {
      const leader = "leader";
      const staff1 = "staff1";
      const staff2 = "staff2";
      const staff3 = "staff3";
      const dStaff = "dStaff";
      res.send(
        worker.template(
          worker.workerList(dStaff, filelist),
          worker.workerList(leader, filelist),
          worker.workerList(staff1, filelist),
          worker.workerList(staff2, filelist),
          worker.workerList(staff3, filelist)
        )
      );
      console.log("[Fs] 근무자 파일리스트 불러오기 성공");
    } else {
      res.status(500);
      res.send(template(filelistErrAlert.msg, filelistErrAlert.link));
      console.log(err);
      console.log("[Fs] 근무자 파일리스트 불러오기 실패");
    }
  });
};

exports.inputWorker = (req, res) => {
  console.log("called inputWorker");
  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, "/admin/worker"));
  } else {
    objects.workerObj = [null, null, null, null];
    let { leader, staff1, staff2, staff3 } = req.body;

    objects.workerObj[0] = util.workerParser(leader);
    objects.workerObj[1] = util.workerParser(staff1);
    objects.workerObj[2] = util.workerParser(staff2);
    objects.workerObj[3] = util.workerParser(staff3);

    objects.updateObjects();
    res.status(200);
    res.send(template(workerInputAlert.msg, workerInputAlert.link));
    console.log("근무자 현황 적용 성공");
  }
};

exports.uploadWorker = (req, res, next) => {
  console.log("called uploadWorker");
  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, "/admin/worker"));
  } else {
    res.status(200);
    res.send(template(workerUploadAlert.msg, workerUploadAlert.link));
    console.log("근무자 추가 성공");
  }
};

exports.deleteWorker = (req, res) => {
  console.log("called deleteWorker");
  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, "/admin/worker"));
  } else {
    const dir = "./worker/";
    fs.unlink(dir + req.body.dStaff, (err) => {
      if (!err) {
        for (let i = 0; i < objects.workerObj.length; i++) {
          if (objects.workerObj[i] === req.body.dStaff) {
            objects.workerObj[i] = null;
            break;
          }
        }
        objects.updateObjects();
        res.status(200);
        res.send(template(workerDeleteAlert.msg, workerDeleteAlert.link));
        console.log("근무자 삭제 성공");
      } else {
        res.status(500);
        res.send(template(filelistErrAlert.msg, filelistErrAlert.link));
        console.log(err);
        console.log("[Fs] 삭제 대상 근무자 파일 불러오기 실패");
      }
    });
  }
};

exports.slide = (req, res) => {
  console.log("called slide");
  fs.readdir("./views/src/pages", function (err, filelist) {
    if (!err) {
      var list = util.rmExtention(filelist);
      res.send(slide.template(slide.checkList(list)));
      console.log("[Fs] 슬라이드 페이지 파일리스트 불러오기 성공");
    } else {
      res.status(500);
      res.send(template(filelistErrAlert.msg, filelistErrAlert.link));
      console.log(err);
      console.log("[Fs] 슬라이드 페이지 파일리스트 불러오기 실패");
    }
  });
};

exports.inputSlide = (req, res) => {
  console.log("called inputSlide");
  console.log(req.body);
  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, "/admin/slide"));
  } else {
    if (req.body.checkResult) {
      checkList = req.body.checkResult.split(",");

      objects.slideObj = [];
      for (let i = 0; i < checkList.length; i++) {
        objects.slideObj[i] = checkList[i];
      }
      objects.updateObjects();
      res.status(200);
      res.send(template(slideAlert.msg, slideAlert.link));
      console.log("슬라이드 순서 적용 성공");
    } else {
      res.status(400);
      res.send(template(slideCheckAlert.msg, slideCheckAlert.link));
      console.log("슬라이드 순서 body가 존재하지 않음");
    }
  }
};

exports.inputLotation = (req, res) => {
  console.log("called inputLotation");

  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, "/admin/slide"));
  } else {
    let { sHour, sMinute, sSecond } = req.body;
    const hour = sHour ? parseInt(sHour) : 0;
    const minute = sMinute ? parseInt(sMinute) : 0;
    const second = sSecond ? parseInt(sSecond) : 0;

    objects.lotationObj = [hour * 60 * 60 + minute * 60 + second];
    objects.updateObjects();
    res.status(200);
    res.send(template(lotationAlert.msg, lotationAlert.link));
    console.log("슬라이드 순환 시간 적용 성공");
  }
};

exports.inputNews = (req, res) => {
  console.log("called inputNews");

  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, "/admin/slide"));
  } else {
    let { nHour, nMinute, nSecond } = req.body;
    const hour = nHour ? parseInt(nHour) : 0;
    const minute = nMinute ? parseInt(nMinute) : 0;
    const second = nSecond ? parseInt(nSecond) : 0;

    objects.newsObj = [hour * 60 * 60 + minute * 60 + second];
    objects.updateObjects();
    res.status(200);
    res.send(template(newsAlert.msg, newsAlert.link));
    console.log("뉴스탭 순환 시간 적용 성공");
  }
};
