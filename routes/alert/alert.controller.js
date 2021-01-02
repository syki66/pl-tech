const alert = require("../../lib/alert");

//HTTP 응답코드
// 200 OK - 성공적으로 처리했을때 (로그인이 필요, 비밀번호가 일치하지 않다고 판단하는것도 성공적으로 처리한 것임)
// 201 Created - 무언가 항상 생성하는 라우터에서 성공적으로 생성되었을때 (ex. 공지사항 작성)

// GET - /alert/auth 접근 권한 오류 알람
exports.auth = (req, res) => {
  res.status(200);
  res.send(alert.template("로그인이 필요합니다.", "/auth/login"));
};

// GET - /alert/create 공지 생성 완료 알람
exports.create = (req, res) => {
  res.status(201);
  res.send(
    alert.template("공지사항을 작성했습니다.", "/admin/notice/manage/1")
  );
};

// GET - /alert/create/title 공지 생성 완료 알람
exports.title = (req, res) => {
  res.status(201);
  res.send(alert.template("제목을 입력해주세요.", "/admin/notice"));
};

// GET - /alert/update 공지 수정 완료 알람
exports.update = (req, res) => {
  res.status(200);
  res.send(
    alert.template("공지사항을 수정했습니다.", "/admin/notice/manage/1")
  );
};

// GET - /alert/confirm 공지 삭제 완료 알람
exports.confirm = (req, res) => {
  res.status(201);
  res.send(template.a_confirm("삭제하시겠습니까?", "/alert/delete"));
};

// GET - /alert/delete/:pageNum 공지 삭제 완료 알람
exports.delete = (req, res) => {
  const pnum = req.params.pageNum;
  res.status(200);
  res.send(
    alert.template("공지사항을 삭제했습니다.", `/admin/notice/manage/${pnum}`)
  );
};

// GET - /alert/welcome 환영문구 작성 완료 알람
exports.welcome = (req, res) => {
  res.status(200);
  res.send(alert.template("환영문구가 성공적으로 반영되었습니다.", "/admin/welcome"));
};

// GET - /alert/welcome/visitor 방문자명 글자 수 제한 알람
exports.visitor = (req, res) => {
  res.status(201);
  res.send(
    alert.template("방문자명은 9자를 초과할 수 없습니다.", "/admin/welcome")
  );
};

// GET - /alert/welcomve/sentence 환영문구 글자 수 제한 알람
exports.sentence = (req, res) => {
  res.status(201);
  res.send(
    alert.template("환영문구는 36자를 초과할 수 없습니다.", "/admin/welcome")
  );
};

// GET - /alert/register 관리자 등록 완료 알람
exports.register = (req, res) => {
  res.status(201);
  res.send(alert.template("관리자로 등록되었습니다.", "/auth/login"));
};

// GET - /alert/login/pw 비밀번호 오류 알람
exports.passErr = (req, res) => {
  res.status(200);
  res.send(alert.template("비밀번호가 일치하지 않습니다.", "/auth/login"));
};

// GET - /alert/login/id 아이디 오류 알람
exports.idErr = (req, res) => {
  res.status(200);
  res.send(alert.template("아이디가 일치하지 않습니다.", "/auth/login"));
};

// GET - /alert/login 로그인 완료 알람
exports.login = (req, res) => {
  res.status(200);
  res.send(alert.template("관리자로 로그인 했습니다.", "/admin"));
};

// GET - /alert/logout 로그아웃 완료 알람
exports.logout = (req, res) => {
  res.status(200);
  res.send(alert.template("로그아웃 했습니다.", "/home"));
};

// GET - /alert/worker 근무자 등록 완료 알람
exports.worker = (req, res) => {
  res.status(201);
  res.send(alert.template("근무자 등록을 완료했습니다.", "/admin"));
};

// GET - /alert/worker/select 근무자 선택 오류 알람
exports.select = (req, res) => {
  res.status(201);
  res.send(alert.template("근무자를 선택 해주세요.", "/admin/worker"));
};

/// GET - /alert/worker/dep dep(부서) 입력 오류 알람
exports.dep = (req, res) => {
  res.status(201);
  res.send(alert.template("부서명이 올바르지 않습니다. (1 ~ 8자)", "/admin/worker"));
};

// GET - /alert/worker/rank rank(직급) 입력 오류 알람
exports.rank = (req, res) => {
  res.status(201);
  res.send(alert.template("직급이 올바르지 않습니다. (1 ~ 8자)", "/admin/worker"));
};

// GET - /alert/worker/name name(이름) 입력 오류 알람
exports.name = (req, res) => {
  res.status(201);
  res.send(alert.template("이름이 올바르지 않습니다. (1 ~ 8자)", "/admin/worker"));
};

// GET - /alert/worker/upload 근무자 사진 업로드 완료 알람
exports.upload = (req, res) => {
  res.status(201);
  res.send(alert.template("근무자 사진을 등록했습니다.", "/admin/worker"));
};

// GET - /alert/worker/uploadErr 근무자 사진 업로드 오류 알람
exports.uploadErr = (req, res) => {
  res.status(201);
  res.send(alert.template("사진을 등록해 주세요.", "/admin/worker"));
};

// GET - /alert/worker/delete 근무자 사진 삭제 완료 알람
exports.wdelete = (req, res) => {
  res.status(200);
  res.send(alert.template("근무자 사진을 삭제했습니다.", "/admin/worker"));
};

// GET - /alert/wmanage/src 근무자 사진 삭제 오류 알람
exports.workerSrc = (req, res) => {
  res.status(201);
  res.send(alert.template( "삭제할 근무자를 선택해 주세요.", "/admin/worker"));
};

// GET - /alert/safety 무재해 기록판 설정 완료 알람
exports.safety = (req, res) => {
  res.status(201);
  res.send(alert.template("무재해 기록판 설정을 완료했습니다.", "/admin/safety"));
};

// GET - /alert/safety/hazard 무재해 기록판 배수 설정 오류 알람 - 3자리 초과
exports.hazard = (req, res) => {
  res.status(201);
  res.send(
    alert.template("배수는 3자리를 초과할 수 없습니다.", "/admin/safety")
  );
};

// GET - /alert/safety/start 무재해 기록판 날짜 설정 오류 알람 - 시작 날짜 > 현재 날짜
exports.start = (req, res) => {
  res.status(201);
  res.send(
    alert.template(
      "시작 날짜는 현재 날짜 보다 빨라야 합니다.",
      "/admin/safety"
    )
  );
};

// GET - /alert/safety/target 무재해 기록판 날짜 설정 오류 알람 - 목표 날짜 < 현재 날짜
exports.target = (req, res) => {
  res.status(201);
  res.send(
    alert.template(
      "목표 날짜는 현재 날짜 보다 늦어야 합니다.",
      "/admin/safety"
    )
  );
};

// GET - /alert/slide 슬라이드 적용 완료 알람
exports.slide = (req, res) => {
  res.status(201);
  res.send(alert.template("슬라이드 순서를 적용했습니다.", "/admin/slide"))
};

// GET - /alert/slide/check 슬라이드 체크 오류 알람
exports.check = (req, res) => {
  res.status(201);
  res.send(alert.template("슬라이드를 선택 해주세요.", "/admin/slide"))
};

// GET - /alert/slide/lotation 슬라이드 순환 시간 적용 완료 알람
exports.lotation = (req, res) => {
  res.status(201);
  res.send(alert.template("슬라이드 순환 시간을 적용했습니다.", "/admin/slide"))
};

// GET - /alert/slide/news 뉴스탭 순환 시간 적용 완료 알람
exports.news = (req, res) => {
  res.status(201);
  res.send(alert.template("뉴스탭 순환 시간을 적용했습니다.", "/admin/slide"))
};

// GET - /alert/slide/time 순환 시간 입력 오류 알람
exports.time = (req, res) => {
  res.status(201);
  res.send(alert.template("값이 올바르지 않습니다. (입력 범위 : 0 ~ 500)", "/admin/slide"))
};
