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
        res.redirect(`/admin/post/manage`);
        //res.json(util.successTrue(data.dataValues));
      })
      .catch((err) => {
        console.log("공지를 생성할 수 없습니다.");
        res.json(util.successFalse(error.createErr()));
      });
  } else {
    console.log("로그인이 필요합니다.");
    res.json(util.successFalse(error.authErr()));
  }
};

// GET - /admin/post/manage 공지 관리 페이지
exports.managePost = (req, res) => {
  console.log("called managePost");

  models.Notice.findAll({
    attributes: ["id", "title"],
    raw: true,
  })
    .then((data) => {
      console.log(data);
      //res.writeHead(200);
      res.end(template.m_board(template.m_noticeList(data)));
      //res.json(util.successTrue(data));
    })
    .catch((err) => {
      console.log("데이터를 불러올 수 없습니다.");
      res.json(util.successFalse(error.loadErr()));
    })
    .catch((err) => {
      console.log("데이터를 불러올 수 없습니다.");
      res.json(util.successFalse(error.loadErr()));
    });
};

// GET - /admin/post/:postnum/update 공지 수정 페이지
exports.updatePost = (req, res) => {
  console.log("called updatePost");

  const _id = req.params.postnum;
  
  models.Notice.findAll({
    where: { id: _id },
    attributes: ["id", "title", "contents"],
    raw: true,
  })
    .then((data) => {
      console.log(data);
      var id = data[0].id;
      var title = data[0].title;
      var contents = data[0].contents;

      //res.writeHead(200);
      res.send(template.m_edit(id, title, contents));
      //res.json(util.successTrue(data));
    })
    .then((data) => {
      //   var _id = data[0].id;
      //   var _title = data[0].title;
      //   var _contents = data[0].contents;

      //   res.writeHead(200);
      //   res.end(template.m_edit(_id, _title, _contents));
      console.log(data);
      res.json(util.successTrue(data));
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
    var _id = req.params.postnum;
    var _contents = req.body.contents;
    var _cdate = util.currentDate();

    models.Notice.update(
      {
        contents: _contents,
        cdate: _cdate,
      },
      { where: { id: _id } }
    )
      .then((data) => {
        console.log("공지를 수정하였습니다.");
        res.writeHead(302, { Location: `/admin/post/manage` });
        res.end("success");
        //res.json(util.successTrue(message.updateMsg()));
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

  //console.log(req.session);
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
        res.writeHead(302, { Location: "/admin/post/manage" });
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

const inputController = require("../input/input.controller");
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