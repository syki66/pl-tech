const util = require("../../middleware/util");
const models = require("../../models");
const template = require("../../lib/template");
const slide = require("../../values/slide");
const objects = require("../../values/objects");
const produce = require("../../values/produce");
const error = require("../../lib/error");
const message = require("../../lib/message");
const errorHandler = require("errorhandler");
const fs = require("fs");
const { nextTick } = require("process");

// /admin 접근 권한 검사 - 세션 만료시 경고 메세지
exports.authCheck = (req, res, next) => {
  console.log("called authCheck");
  const isAdminStatus = util.isAdminStatus(req, res);
  if (isAdminStatus) {
    next();
  } else {
    res.redirect("/alert/auth");
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
};

// GET - /admin/notice/manage 공지 관리 페이지
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
      console.log(data);
      const list = template.c_noticeList(data, pnum, true);

      models.Notice.findAll({
        attributes: [[models.sequelize.fn("count", "*"), "count"]],
        raw: true,
      })
        .then((data) => {
          const pages = Math.ceil(data[0].count / psize);
          const pageBar = template.c_pageBar(pnum, pages);
          res.send(template.c_board(list, pageBar, true));
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
        template.a_edit(data[0].id, data[0].title, data[0].contents, pnum)
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
        produce.values = slide.valuesToJson(
          objects.parsedObj,
          objects.welcomeObj,
          objects.noticeObj,
          objects.safetyObj,
          objects.workerObj,
          objects.slideObj
        );
        // objects.updateObjects();
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
      updateNoticeObj();
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
      updateNoticeObj();
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

exports.inputWelcome = (req, res) => {
  console.log("called inputWelcome");
  if (req.body === null || req.body === undefined) {
    res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
  } else {
    objects.welcomeObj = [req.body.visitor + "님", req.body.sentence];
    objects.updateObjects();
    res.writeHead(302, { Location: "/alert/welcome" });
    res.end("success");
  }
};

exports.slide = (req, res) => {
  console.log("called slide");
  fs.readdir("./views/src/pages", function (error, filelist) {
    var list = util.rmExtention(filelist);
    res.send(template.a_slide(template.a_checkList(list)));
  });
};

exports.inputSlide = (req, res) => {
  console.log("called inputSlide");

  checkList = req.body.checkResult.split(",");

  objects.slideObj = [];
  for (let i = 0; i < checkList.length; i++) {
    objects.slideObj[i] = checkList[i];
  }
  objects.updateObjects();
  res.writeHead(302, { Location: "/alert/slide" });
  res.end("success");
};

exports.worker = (req, res) => {
  console.log("called worker");
  fs.readdir("./worker", function (error, filelist) {
    const leader = "leader";
    const staff1 = "staff1";
    const staff2 = "staff2";
    const staff3 = "staff3";
    const dStaff = "dStaff";
    res.send(
      template.a_workerManage(
        template.a_workerList(dStaff, filelist),
        template.a_workerList(leader, filelist),
        template.a_workerList(staff1, filelist),
        template.a_workerList(staff2, filelist),
        template.a_workerList(staff3, filelist)
      )
    );
  });
};

exports.inputWorker = (req, res) => {
  console.log("called inputWorker");
  if (req.body === null || req.body === undefined) {
    res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
  } else {
    console.log(req.body);
    var i = 0;
    for (var j in req.body) {
      const image = req.body[j];
      const element = image.split("-");
      const dep = element[0];
      const rank = element[1];
      const name = element[2].split(".")[0];
      objects.workerObj[i] = [dep, image, rank, name];
      console.log(objects.workerObj[i]);
      i = i + 1;
    }
    objects.updateObjects();
    res.redirect("/alert/worker");
  }
};

exports.uploadWorker = (req, res) => {
  console.log("called uploadWorker");
  console.log(req.file);
  res.redirect("/alert/worker/upload");
};

exports.deleteWorker = (req, res) => {
  console.log("called deleteWorker");
  const dir = "./worker/";
  fs.unlink(dir + req.body.dStaff, (err) => {
    if (err) {
      res.redirect("/alert/worker/warn");
      return false;
    } else {
      for (let i = 0; i < objects.workerObj.length; i++) {
        if (objects.workerObj[i] === req.body.dStaff) {
          objects.workerObj[i] = null;
          break;
        }
      }
      objects.updateObjects();
      res.redirect("/alert/worker/delete");
    }
  });
};

exports.deleteWorker = (req, res) => {
  console.log("called deleteWorker");
  const dir = "./worker/";
  fs.unlink(dir + req.body.dStaff, (err) => {
    if (err) {
      res.redirect("/alert/wmanage/warn");
      return false;
    } else {
      for (let i = 0; i < objects.workerObj.length; i++) {
        if (this.workerObj[i] === req.body.dStaff) {
          this.workerObj[i] = null;
          break;
        }
      }
      objects.updateObjects();
      res.redirect("/alert/wmanage");
    }
  });
};

exports.safety = (req, res) => {
  console.log("called safety");
  res.render("../views/safety.html");
};

exports.inputSafety = (req, res) => {
  console.log("called inputSafety");
  if (req.body === null || req.body === undefined) {
    res.json(util.successFalse(new Error(), "바디가 존재하지 않습니다."));
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
};
