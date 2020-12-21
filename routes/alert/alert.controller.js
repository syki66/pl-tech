const template = require('../../lib/template');

// GET - /alert/welcome 환영문구 작성 완료 알람
exports.welcome = (req, res) => {
  res.status(201);
  res.send(template.alert("환영문구가 성공적으로 반영되었습니다.", "/admin"))
};

// GET - /alert/register 관리자 등록 완료 알람
exports.register = (req, res) => {
  res.status(201);
  res.send(template.alert("관리자로 등록되었습니다.", "/auth/login"));
};

// GET - /alert/login 로그인 완료 알람
exports.login = (req, res) => {
  res.status(201);
  res.send(template.alert("관리자로 로그인 했습니다.", "/admin"));
};

// GET - /alert/logout 로그아웃 완료 알람
exports.logout = (req, res) => {
  res.status(201);
  res.send(template.alert("로그아웃 했습니다.", "/auth/login"));
};

// GET - /alert/wmanage 로그아웃 완료 알람
exports.wmanage = (req, res) => {
  res.status(201);
  res.send(template.alert("근무자 등록을 완료했습니다.", "/admin"));
};

