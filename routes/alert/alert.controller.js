const template = require('../../lib/template');

// GET - /alert/auth 접근권한 오류 알람
exports.auth = (req, res) => {
  res.status(201);
  res.send(template.alert("로그인이 필요합니다.", "/auth/login"));
};


// GET - /alert/welcome 환영문구 작성 완료 알람
exports.welcome = (req, res) => {
  res.status(201);
  res.send(template.alert("환영문구가 성공적으로 반영되었습니다.", "/admin"));
};

// GET - /alert/register 관리자 등록 완료 알람
exports.register = (req, res) => {
  res.status(201);
  res.send(template.alert("관리자로 등록되었습니다.", "/auth/login"));
};

// GET - /alert/passErr 비밀번호 오류 알람
exports.passErr = (req, res) => {
  res.status(201);
  res.send(template.alert("비밀번호가 일치하지 않습니다.", "/auth/login"));
};

// GET - /alert/idErr 로그인 완료 알람
exports.idErr = (req, res) => {
  res.status(201);
  res.send(template.alert("아이디가 일치하지 않습니다.", "/auth/login"));
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

// GET - /alert/wmanage 근무자 등록 완료 알람
exports.wmanage = (req, res) => {
  res.status(201);
  res.send(template.alert("근무자 등록을 완료했습니다.", "/admin"));
};

// GET - /alert/wmanage/warn 근무자 등록 오류 알람
exports.wmanageWarn = (req, res) => {
  res.status(201);
  res.send(template.alert( "근무자 4명을 선택해야 합니다.", "/admin/wmanage"));
};

// GET - /alert/safety 무재해 기록판 설정 완료 알람
exports.safety = (req, res) => {
  res.status(201);
  res.send(template.alert("무재해 기록판 설정을 완료했습니다.", "/admin"));
};

// GET - /alert/slide 슬라이드 적용 완료 알람
exports.slide = (req, res) => { 
  res.status(201);
  res.send(template.alert("슬라이드 순서를 적용했습니다.", "/admin"))
};