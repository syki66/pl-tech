const template = require("../../lib/template");

//HTTP 응답코드
// 200 OK - 성공적으로 처리했을때 (로그인이 필요, 비밀번호가 일치하지 않다고 판단하는것도 성공적으로 처리한 것임)
// 201 Created - 무언가 항상 생성하는 라우터에서 성공적으로 생성되었을때 (ex. 공지사항 작성)

// GET - /alert/auth 접근권한 오류 알람
exports.auth = (req, res) => {
  res.status(200);
  res.send(template.c_alert("로그인이 필요합니다.", "/auth/login"));
};

// GET - /alert/create 공지 생성 완료 알람
exports.create = (req, res) => {
  res.status(201);
  res.send(
    template.c_alert("공지사항을 작성했습니다.", "/admin/notice/manage/1")
  );
};

// GET - /alert/update 공지 생성 완료 알람
exports.update = (req, res) => {
  res.status(200);
  res.send(
    template.c_alert("공지사항을 수정했습니다.", "/admin/notice/manage/1")
  );
};

// GET - /alert/delete 공지 생성 완료 알람
exports.delete = (req, res) => {
  res.status(200);
  res.send(
    template.c_alert("공지사항을 삭제했습니다.", "/admin/notice/manage/1")
  );
};

// GET - /alert/welcome 환영문구 작성 완료 알람
exports.welcome = (req, res) => {
  res.status(200);
  res.send(template.c_alert("환영문구가 성공적으로 반영되었습니다.", "/admin"));
};

// GET - /alert/welcome/visitor 방문자명 글자 수 제한 알람
exports.visitor = (req, res) => {
  res.status(201);
  res.send(
    template.c_alert("방문자명은 9자를 초과할 수 없습니다.", "/admin/welcome")
  );
};

// GET - /alert/welcomve/sentence 환영문구 글자 수 제한 알람
exports.sentence = (req, res) => {
  res.status(201);
  res.send(
    template.c_alert("환영문구는 36자를 초과할 수 없습니다.", "/admin/welcome")
  );
};

// GET - /alert/register 관리자 등록 완료 알람
exports.register = (req, res) => {
  res.status(201);
  res.send(template.c_alert("관리자로 등록되었습니다.", "/auth/login"));
};

// GET - /alert/worker/upload 근무자 사진 등록 완료 알람
exports.uploadErr = (req, res) => {
  res.status(201);
  res.send(template.c_alert("사진을 등록해 주세요.", "/admin/worker"));
};

// GET - /alert/passErr 비밀번호 오류 알람
exports.passErr = (req, res) => {
  res.status(200);
  res.send(template.c_alert("비밀번호가 일치하지 않습니다.", "/auth/login"));
};

// GET - /alert/idErr 로그인 완료 알람
exports.idErr = (req, res) => {
  res.status(200);
  res.send(template.c_alert("아이디가 일치하지 않습니다.", "/auth/login"));
};

// GET - /alert/login 로그인 완료 알람
exports.login = (req, res) => {
  res.status(200);
  res.send(template.c_alert("관리자로 로그인 했습니다.", "/admin"));
};

// GET - /alert/logout 로그아웃 완료 알람
exports.logout = (req, res) => {
  res.status(200);
  res.send(template.c_alert("로그아웃 했습니다.", "/auth/login"));
};

// GET - /alert/worker 근무자 등록 완료 알람
exports.worker = (req, res) => {
  res.status(201);
  res.send(template.c_alert("근무자 등록을 완료했습니다.", "/admin"));
};

// GET - /alert/worker/dep 부서 입력 오류 알람
exports.dep = (req, res) => {
  res.status(201);
  res.send(
    template.c_alert("부서명이 올바르지 않습니다.(1~8자)", "/admin/worker")
  );
};

// GET - /alert/worker/rank 직급 입력 오류 알람
exports.rank = (req, res) => {
  res.status(201);
  res.send(
    template.c_alert("직급이 올바르지 않습니다.(1~8자)", "/admin/worker")
  );
};

// GET - /alert/worker/name 이름 입력 오류 알람
exports.name = (req, res) => {
  res.status(201);
  res.send(
    template.c_alert("이름이 올바르지 않습니다.(1~8자)", "/admin/worker")
  );
};

// GET - /alert/worker/upload 근무자 사진 등록 완료 알람
exports.wupload = (req, res) => {
  res.status(200);
  res.send(template.c_alert("근무자 사진을 등록했습니다.", "/admin/worker"));
};

// GET - /alert/worker/delete 근무자 사진 삭제 완료 알람
exports.wdelete = (req, res) => {
  res.status(200);
  res.send(template.c_alert("근무자 사진을 삭제했습니다.", "/admin/worker"));
};

// GET - /alert/worker/warn 근무자 사진 삭제 오류 알람
exports.workerWarn = (req, res) => {
  res.status(200);
  res.send(template.c_alert("근무자 4명을 선택해야 합니다.", "/admin/worker"));
};

// GET - /alert/safety 무재해 기록판 설정 완료 알람
exports.safety = (req, res) => {
  res.status(201);
  res.send(template.c_alert("무재해 기록판 설정을 완료했습니다.", "/admin"));
};

// GET - /alert/safety/hazard 무재해 기록판 설정 완료 알람
exports.hazard = (req, res) => {
  res.status(201);
  res.send(
    template.c_alert("배수는 3자리를 초과할 수 없습니다.", "/admin/safety")
  );
};

// GET - /alert/safety/date 무재해 기록판 설정 완료 알람
exports.start = (req, res) => {
  res.status(201);
  res.send(
    template.c_alert(
      "시작 날짜는 현재 날짜 보다 빨라야 합니다.",
      "/admin/safety"
    )
  );
};

// GET - /alert/safety/date 무재해 기록판 설정 완료 알람
exports.target = (req, res) => {
  res.status(201);
  res.send(
    template.c_alert(
      "목표 날짜는 현재 날짜 보다 늦어야 합니다.",
      "/admin/safety"
    )
  );
};

// GET - /alert/slide 슬라이드 적용 완료 알람
exports.slide = (req, res) => {
  res.status(201);
  res.send(template.c_alert("슬라이드 순서를 적용했습니다.", "/admin"));
};
