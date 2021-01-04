const util = require("../../middleware/util");
const models = require("../../models");
const board = require("../../lib/board");
const notice = require("../../lib/notice");
const worker = require("../../lib/worker");
const slide = require("../../lib/slide");
const slideValues = require("../../values/slide");
const objects = require("../../values/objects");
const produce = require("../../values/produce");
const alert = require("../../lib/alert");
const fs = require("fs");

// /admin 접근 권한 검사 - 세션 만료시 경고 메세지
exports.authCheck = (req, res, next) => {
  console.log("called authCheck");
  const isAdminStatus = util.isAdminStatus(req, res);
  if (isAdminStatus) {
    next();
  } else {
    res.writeHead(302, { Location: "/alert/auth" });
    res.end("success");
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
    res.send(alert.template(valErr.data.errors[0].msg, "/admin/notice"));
  } else {
    models.Notice.create({
      title: req.body.title,
      contents: req.body.contents,
      cdate: util.currentDate(),
    })
      .then((data) => {
        console.log(data.dataValues);
        console.log("공지를 생성하였습니다.");
        updateNoticeObj();
        res.writeHead(302, { Location: "/alert/create" });
        res.end("success");
      })
      .catch((err) => {
        console.log(err);
        res.json(util.successFalse(err));
      });
  }
};
  
  // GET - /admin/notice/manage/:pageNum 공지 관리 페이지
exports.manageNotice = (req, res) => {
  console.log("called manageNotice");

  const pnum = req.params.pageNum;
  // 페이지당 6개씩
  const psize = 6;
  // 시작 페이지
  const begin = (pnum - 1) * psize;

  models.Notice.findAll({
    attributes: ["id", "title", "cdate"],
    raw: true,
    order: [["id", "DESC"]],
    // begin 부터 psize 만큼 데이터 조회
    limit: [begin, psize],
  })
    .then((data) => {
      // console.log(data);
      const list = board.noticeList(data, pnum, true);

      models.Notice.findAll({
        attributes: [[models.sequelize.fn("count", "*"), "count"]],
        raw: true,
      })
        .then((data) => {
          const pages = Math.ceil(data[0].count / psize);
          const pageBar = board.pageBar(pnum, pages);
          res.send(board.template(list, pageBar, true));
        })
        .catch((err) => {
          console.log(err);
          es.json(util.successFalse(err));
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(util.successFalse(err));
    });
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
      res.send(
        notice.edit(data[0].id, data[0].title, data[0].contents, pnum)
      );
    })
    .catch((err) => {
      console.log("데이터를 불러올 수 없습니다.");
      res.json(util.successFalse(err));
    });
};

// 글 생성 및 삭제시 업데이트
const updateNoticeObj = () => {
  models.Notice.findAll({
    attributes: ["id", "title", "cdate"],
    raw: true,
    order: [["id", "DESC"]],
    limit: 5,
  })
    .then((data) => {
      console.log(data);
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
      console.log(err);
      res.json(util.successFalse(err));
    });
};

// PATCH - /admin/notice/:noticeNum/uprocess 공지 수정 처리 프로세스
exports.updateProcess = (req, res) => {
  console.log("called updateProcess");
  
  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, `/admin/notice/${req.params.noticeNum}/update`));
  } else {

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
        updateNoticeObj();
        res.writeHead(302, { Location: "/alert/update" });
        res.end("success");
      })
      .catch((err) => {
        console.log("공지를 수정할 수 없습니다.");
        res.json(util.successFalse(err));
      });
  }
};

// DELETE - /admin/notice/:noticeNum/dprocess 공지 삭제 처리 프로세스
exports.deleteProcess = (req, res) => {
  console.log("called deleteProcess");
  const pnum = req.body.pageNum;
  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, `/admin/notice/manage/${pnum}`));
  } else {
    models.Notice.destroy({
      where: { id: req.params.noticeNum },
    })
      .then((data) => {
        console.log("공지를 삭제하였습니다.");
        updateNoticeObj();
        res.writeHead(302, { Location: `/alert/delete/${pnum}` });
        res.end("success");
      })
      .catch((err) => {
        console.log("공지를 삭제할 수 없습니다.");
        res.json(util.successFalse(err));
      });
  }
};

exports.welcome = (req, res) => {
  console.log("called welcome");
  res.render("../views/welcome.html");
};

exports.inputWelcome = (req, res) => {
  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, `/admin/welcome`));
  } else {
    console.log("called inputWelcome");
    if (req.body === null || req.body === undefined) {
      res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
    } else {
      objects.welcomeObj = [req.body.visitor + "님", req.body.sentence];
      objects.updateObjects();
      res.writeHead(302, { Location: "/alert/welcome" });
      res.end("success");
    }
  }
};

exports.safety = (req, res) => {
  console.log("called safety");
  res.render("../views/safety.html");
};

exports.inputSafety = (req, res) => {
  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, "/admin/safety"));
  } else {
    console.log("called inputSafety");
    if (req.body === null || req.body === undefined) {
      res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
    } else {
      const moment = require("moment");
      require("moment-timezone");
      moment.tz.setDefault("Asia/Seoul");

      // 현재 날짜
      var date = moment().format("YYYY년 MM월 DD일");

      // 시작 날짜 > 현재 날짜
      if (req.body.startDate > date) {
        res.redirect("/alert/safety/start");
      } // 목표날짜 < 현재 날짜
      else if (req.body.targetDate < date) {
        res.redirect("/alert/safety/target");
      } else {
        console.log(req.body);
        objects.calcSafety(
          req.body.zeroHazard,
          req.body.startDate,
          req.body.targetDate
        );
        objects.updateObjects();
        res.redirect("/alert/safety");
      }
    }
  }
};

exports.worker = (req, res) => {
  console.log("called worker");
  fs.readdir("./worker", function (error, filelist) {
    const leader = "leader";
    const staff1 = "staff1";
    const staff2 = "staff2";
    const staff3 = "staff3";
    const dStaff = "dStaff";
    res.send(worker.template(
      worker.workerList(dStaff, filelist),
      worker.workerList(leader, filelist),
      worker.workerList(staff1, filelist),
      worker.workerList(staff2, filelist),
      worker.workerList(staff3, filelist)));
  })
};

exports.inputWorker = (req, res) => {
  console.log("called inputWorker");
  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, "/admin/worker"));
  } else {
    if (req.body === null || req.body === undefined) {
      res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
    } else {
      // 근무자 미선택 시
      if (
        req.body.leader === undefined &&
        req.body.staff1 === undefined &&
        req.body.staff2 === undefined &&
        req.body.staff3 === undefined
      ) {
        res.redirect("/alert/worker/select");
      } else {
        objects.workerObj = [null, null, null, null];

        if (req.body.leader !== undefined) {
          objects.workerObj[0] = util.workerParser(req.body.leader);
        }
        if (req.body.staff1 !== undefined) {
          objects.workerObj[1] = util.workerParser(req.body.staff1);
        }
        if (req.body.staff2 !== undefined) {
          objects.workerObj[2] = util.workerParser(req.body.staff2);
        }
        if (req.body.staff3 !== undefined) {
          objects.workerObj[3] = util.workerParser(req.body.staff3);
        }

        console.log(objects.workerObj);

        objects.updateObjects();
        res.writeHead(302, { Location: "/alert/worker" });
        res.end("success");
      }
    }
  }
};

exports.uploadWorker = (req, res, next) => {
  console.log("called uploadWorker");
  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, "/admin/worker"));
  } else {
    if (req.file === undefined) {
      res.redirect("/alert/worker/uploadErr");
    } else {
      res.writeHead(302, { Location: "/alert/worker/upload" });
      res.end("success");
    }
  }
};

exports.deleteWorker = (req, res) => {
  console.log("called deleteWorker");
  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, "/admin/worker"));
  } else {
    const dir = "./worker/";
    fs.unlink(dir + req.body.dStaff, (err) => {
      if (err) {
        res.redirect("/alert/worker/src");
        return false;
      } else {
        for (let i = 0; i < objects.workerObj.length; i++) {
          if (objects.workerObj[i] === req.body.dStaff) {
            objects.workerObj[i] = null;
            break;
          }
        }
        objects.updateObjects();
        res.writeHead(302, { Location: "/alert/worker/delete" });
        res.end("success");
      }
    });
  }
};

exports.slide = (req, res) => {
  console.log("called slide");
  fs.readdir("./views/src/pages", function (error, filelist) {
    var list = util.rmExtention(filelist);
    res.send(slide.template(slide.checkList(list)));
  })
}

exports.slideObj = [];
exports.inputSlide = (req, res) => {
  console.log("called inputSlide");
  console.log(req.body);

  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, "/admin/slide"));
  } else {
    if (req.body.checkResult === "") {
      res.redirect("/alert/slide/check");
    } else {
      checkList = req.body.checkResult.split(",");

      objects.slideObj = [];
      for (let i = 0; i < checkList.length; i++) {
        objects.slideObj[i] = checkList[i];
      }
      objects.updateObjects();
      res.writeHead(302, { Location: "/alert/slide" });
      res.end("success");
    }
  }
};

exports.inputLotation = (req, res) => {
  console.log("called inputLotation");

  console.log(req.body);

  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, "/admin/slide"));
  } else {
    if (req.body === null || req.body === undefined) {
      res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
    } else {
      const hour = req.body.sHour === "" ? 0 : parseInt(req.body.sHour);
      const minute = req.body.sMinute === "" ? 0 : parseInt(req.body.sMinute);
      const second = req.body.sSecond === "" ? 0 : parseInt(req.body.sSecond);

      objects.lotationObj = [hour * 60 * 60 + minute * 60 + second];
      objects.updateObjects();
      res.writeHead(302, { Location: "/alert/slide/lotation" });
      res.end("success");
    }
  }
};

exports.inputNews = (req, res) => {
  console.log("called inputNews");

  console.log(req.body);

  const valErr = req.valErr;
  if (valErr) {
    res.send(alert.template(valErr.data.errors[0].msg, "/admin/slide"));
  } else {
    if (req.body === null || req.body === undefined) {
      res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
    } else {
      const hour = req.body.nHour === "" ? 0 : parseInt(req.body.nHour);
      const minute = req.body.nMinute === "" ? 0 : parseInt(req.body.nMinute);
      const second = req.body.nSecond === "" ? 0 : parseInt(req.body.nSecond);

      objects.newsObj = [hour * 60 * 60 + minute * 60 + second];
      objects.updateObjects();
      res.writeHead(302, { Location: "/alert/slide/news" });
      res.end("success");
    }
  }
};
