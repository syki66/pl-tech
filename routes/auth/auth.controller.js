const util = require("../../middleware/util");
const models = require("../../models");
const bcrypt = require("bcrypt");
const { template } = require("../../lib/alert");
const {
  loginAlert,
  idErrAlert,
  passErrAlert,
  loginErrAlert,
  logoutAlert,
  registerAlert,
  registerErrAlert,
  confirmErrAlert,
} = require("../../values/alert");
const { admin } = require("../admin/admin.controller");

// GET - /auth/login 로그인 페이지
exports.login = (req, res) => {
  //req.session.is_logined 쓸모 업슨ㄴ거 같은데?
  if (req.session.is_logined) {
    res.redirect("/admin");
  } else {
    res.render("../views/login.html");
  }
};

// POST - /auth/linprocess 로그인 처리 프로세스
exports.loginProcess = (req, res) => {
  console.log("called loginProcess");
  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, "/auth/login"));
  } else {
    const post = req.body;
    const in_id = post.id;
    const in_pw = post.password;

    models.Admin.findAll({
      attributes: ["admin_id", "password"],
      where: { admin_id: in_id },
      raw: true,
    })
      .then((data) => {
        if (data.length !== 0) {
          const admin_id = data[0].admin_id;
          const hashed_pw = data[0].password;
          // 비밀번호 확인
          bcrypt.compare(in_pw, hashed_pw, function (err, corr) {
            // 아이디 확인
            if (in_id === admin_id && corr) {
              //success!
              req.session.isLogin = true;
              req.session.save(function () {
                let LA = loginAlert(admin_id);
                res.status(200);
                res.send(template(LA.msg, LA.link));
                console.log(`관리자 ${admin_id} 로그인 했습니다.`);
              });
            } else {
              res.status(401);
              res.send(template(passErrAlert.msg, passErrAlert.link));
              console.log("비밀번호가 일치하지 않습니다.");
            }
          });
        } else {
          res.status(401);
          res.send(template(idErrAlert.msg, idErrAlert.link));
          console.log("아이디가 존재하지 않습니다.");
        }
      })
      .catch((err) => {
        res.status(500);
        res.send(template(loginErrAlert.msg, loginErrAlert.link));
        console.log(err);
        console.log("[DB] 로그인에 실패했습니다.");
      });
  }
};

// DELETE - /auth/loutprocess 로그아웃 처리 프로세스
exports.logoutProcess = (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.status(200);
      res.send(template(logoutAlert.msg, logoutAlert.link));
      console.log("로그아웃 했습니다.");
    } else {
      res.status(500);
      res.send(template(logoutErrAlert.msg, logoutErrAlert.link));
      console.log(err);
      console.log("[Session] 로그아웃에 실패했습니다.");
    }
  });
};

// GET - /auth/register 관리자 등록 페이지
exports.register = (req, res) => {
  res.render("../views/register.html");
};

// POST - /auth/regprocess 관리자 등록 처리 프로세스
exports.registerProcess = (req, res) => {
  const valErr = req.valErr;

  if (valErr) {
    util.printValErr(valErr);
    res.status(400);
    res.send(template(valErr[0].msg, "/auth/register"));
  } else {
    const saltRounds = 10;
    const { id, password, confirm } = req.body;
    if (password === confirm) {
      bcrypt.hash(password, saltRounds, function (err, hashed_pw) {
        if (!err) {
          models.Admin.create({
            admin_id: id,
            password: hashed_pw,
          })
            .then((data) => {
              res.status(201);
              res.send(template(registerAlert.msg, registerAlert.link));
              console.log("관리자가 등록되었습니다");
            })
            .catch((err) => {
              res.status(500);
              res.send(template(registerErrAlert.msg, registerErrAlert.link));
              console.log(err);
              console.log("[DB] 관리자 등록에 실패했습니다");
            });
        } else {
          res.status(500);
          res.send(template(registerErrAlert.msg, registerErrAlert.link));
          console.log("[Hash] 관리자 등록에 실패했습니다");
        }
      });
    } else {
      res.status(400);
      res.send(template(confirmErrAlert.msg, confirmErrAlert.link));
      console.log("비밀번호와 비밀번호 확인 값이 일치하지 않습니다");
    }
  }
};
