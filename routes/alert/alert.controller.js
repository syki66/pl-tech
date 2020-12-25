const template = require('../../lib/template');

// GET - /alert/welcome 환영문구 작성 완료 알람
exports.welcome = (req, res) => {
  let contents = "환영문구가 성공적으로 반영되었습니다."
  let redirect = "/admin"
  res.status(201);
  res.send(template.alert(contents, redirect))
};

// GET - /alert/register 관리자 등록 완료 알람
exports.register = (req, res) => {
  let contents = "관리자로 등록되었습니다."
  let redirect = "/auth/login"
  res.status(201);
  res.send(template.alert(contents, redirect))
};

// GET - /alert/login 로그인 완료 알람
exports.login = (req, res) => {
  let contents = "관리자로 로그인 했습니다."
  let redirect = "/admin"
  res.status(201);
  res.send(template.alert(contents, redirect))
};

// GET - /alert/logout 로그아웃 완료 알람
exports.logout = (req, res) => {
  let contents = "로그아웃 했습니다."
  let redirect = "/auth/login"
  res.status(201);
  res.send(template.alert(contents, redirect))
};

// GET - /alert/wmanage 근무자 등록 완료 알람
exports.wmanage = (req, res) => {
  let contents = "근무자 등록을 완료했습니다."
  let redirect = "/admin"
  res.status(201);
  res.send(template.alert(contents, redirect))
};

// GET - /alert/wmanage 근무자 등록 오류 알람
exports.wmanageWarn = (req, res) => {
  let contents = "근무자 4명을 선택해야 합니다."
  let redirect = "/admin/wmanage"
  res.status(201);
  res.send(template.alert(contents, redirect))
};

// GET - /alert/safety 무재해 기록판 설정 완료 알람
exports.safety = (req, res) => {
  res.status(201);
  res.send(template.alert("무재해 기록판 설정을 완료했습니다.", "/admin"));
};

// GET - /alert/slide 슬라이드 적용 완료 알람
exports.slide = (req, res) => {
  let contents = "슬라이드 순서를 적용했습니다."
  let redirect =  "/admin"
  res.status(201);
  res.send(template.alert(contents, redirect))
};