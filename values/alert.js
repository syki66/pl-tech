//auth.controller
exports.authAlert = {
  msg: "로그인이 필요합니다.",
  link: "/auth/login",
};

exports.idErrAlert = {
  msg: "아이디가 존재하지 않습니다.",
  link: "/auth/login",
};

exports.passErrAlert = {
  msg: "비밀번호가 일치하지 않습니다.",
  link: "/auth/login",
};

exports.registerAlert = {
  msg: "관리자가 등록되었습니다.",
  link: "/auth/login",
};

exports.registerErrAlert = {
  msg: "관리자 등록에 실패했습니다.",
  link: "/auth/register",
};

exports.confirmErrAlert = {
  msg: "비밀번호와 비밀번호 확인 값이 일치하지 않습니다",
  link: "/auth/register",
};

exports.loginAlert = (id) => {
  return {
    msg: `관리자 ${id} 로그인했습니다.`,
    link: "/admin",
  };
};

exports.loginErrAlert = {
  msg: "로그인에 실패했습니다.",
  link: "/auth/login",
};

exports.logoutAlert = {
  msg: "로그아웃했습니다.",
  link: "/auth/login",
};

exports.logoutErrAlert = {
  msg: "로그아웃에 실패했습니다.",
  link: "/admin",
};

//admin.controller

exports.createAlert = {
  msg: "공지사항을 작성했습니다.",
  link: "/admin/notice/manage/1",
};

exports.createErrAlert = {
  msg: "공지사항 작성에 실패했습니다.",
  link: "/admin/notice",
};

exports.noticeListErrAlert = {
  msg: "공지사항 리스트 조회에 실패했습니다.",
  link: "/admin",
};

// exports.editErrAlert = {
//   msg: "공지사항 리스트 조회에 실패했습니다.",
//   link: "/admin",
// };

exports.updateAlert = {
  msg: "공지사항을 수정했습니다.",
  link: "/admin/notice/manage/1",
};

exports.updateErrAlert = (noticeNum) => {
  return {
    msg: "공지사항을 수정하는데 실패했습니다.",
    link: `/admin/notice/${noticeNum}/update`,
  };
};

exports.updateNoticeObjErrAlert = (noticeNum) => {
  return {
    msg: "서버에서 공지사항 수정/삭제 사항을 업데이트하는데 실패했습니다.",
    link: `/admin/notice/${noticeNum}/update`,
  };
};

exports.deleteAlert = (pageNum) => {
  return {
    msg: "공지사항을 삭제했습니다.",
    link: `/admin/notice/manage/${pageNum}`,
  };
};

exports.deleteErrAlert = (pageNum) => {
  return {
    msg: "공지사항을 삭제하는데 실패했습니다.",
    link: `/admin/notice/manage/${pageNum}`,
  };
};

exports.welcomeAlert = {
  msg: "환영문구가 슬라이드에 적용되었습니다.",
  link: "/admin/welcome",
};

// exports.welcomeErrAlert = {
//   msg: "환영문구를 적용하는데 실패했습니다.",
//   link: "/admin/welcome",
// };

exports.startDateAlert = {
  msg: "시작 날짜는 현재 날짜보다 빨라야 합니다.",
  link: "/admin/safety",
};

exports.targetDateAlert = {
  msg: "목표 날짜는 현재 날짜보다 늦어야 합니다.",
  link: "/admin/safety",
};

exports.safetyAlert = {
  msg: "무재해 기록판이 슬라이드에 적용되었습니다.",
  link: "/admin/safety",
};

// exports.safetyErrAlert = {
//   msg: "무재해 기록판을 적용하는데 실패했습니다.",
//   link: "/admin/safety",
// };

exports.filelistErrAlert = {
  msg: "파일리스트를 불러오는데 실패했습니다.",
  link: "/admin",
};

exports.workerInputAlert = {
  msg: "근무자 현황이 적용되었습니다.",
  link: "/admin/worker",
};

exports.workerInputErrAlert = {
  msg: "근무자 현황 적용에 실패했습니다.",
  link: "/admin/worker",
};

exports.workerUploadAlert = {
  msg: "해당 데이터의 근무자를 추가했습니다.",
  link: "/admin/worker",
};

exports.workerDeleteAlert = {
  msg: "해당 데이터의 근무자를 삭제했습니다.",
  link: "/admin/worker",
};

exports.workerDeleteERRAlert = {
  msg: "해당 데이터의 근무자를 삭제하는데 실패했습니다.",
  link: "/admin/worker",
};

exports.slideAlert = {
  msg: "슬라이드 순서가 적용되었습니다.",
  link: "/admin/slide",
};

exports.lotationAlert = {
  msg: "슬라이드 순환 시간이 적용되었습니다.",
  link: "/admin/slide",
};

exports.newsAlert = {
  msg: "뉴스탭 순환 시간이 적용되었습니다.",
  link: "/admin/slide",
};

//home.controller

exports.parsingErrAlert = {
  msg: "DCS 데이터 파싱에 실패했습니다.",
  link: "/",
};

//home.controller
