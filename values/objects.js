const slide = require("../values/slide");
const produce = require("../values/produce");

exports.parsedObj = null;
exports.noticeObj = [null, null, null, null, null];
exports.welcomeObj = [null, null];
exports.safetyObj = [null, null, null, null, null, null];
exports.workerObj = [null, null, null, null];
exports.slideObj = [null];
exports.lotationObj = [null];
exports.newsObj = [null];

exports.updateObjects = () => {
  produce.values = slide.valuesToJson(
    this.parsedObj,
    this.welcomeObj,
    this.noticeObj,
    this.safetyObj,
    this.workerObj,
    this.slideObj,
    this.lotationObj,
    this.newsObj
  );
};

exports.calcSafety = (zhVal, startDate, targetDate) => {
  let now = new Date();

  let yyNow = now.getFullYear(); // 년도
  let mmNow = now.getMonth() + 1; // 월
  let ddNow = now.getDate(); // 날짜

  if (mmNow < 10) {
    mmNow = "0" + mmNow;
  }

  if (ddNow < 10) {
    ddNow = "0" + ddNow;
  }

  let ymdNow = yyNow + "년 " + mmNow + "월 " + ddNow + "일";

  if (startDate === null || targetDate === null) {
    this.safetyObj = ["-", ymdNow, "-", "-", "설정 필요", "설정 필요"];
    this.updateObjects();
  } else {
    let yyStart = startDate.substring(0, 4);
    let yyTarget = targetDate.substring(0, 4);
    let mmStart;
    let mmTarget;
    let ddStart;
    let ddTarget;

    if (startDate.substring(6, 7) === "0") {
      mmStart = startDate.substring(7, 8);
    } else {
      mmStart = startDate.substring(6, 8);
    }

    if (targetDate.substring(6, 7) === "0") {
      mmTarget = targetDate.substring(7, 8);
    } else {
      mmTarget = targetDate.substring(6, 8);
    }

    if (startDate.substring(10, 11) === "0") {
      ddStart = startDate.substring(11, 12);
    } else {
      ddStart = startDate.substring(10, 12);
    }

    if (targetDate.substring(10, 11) === "0") {
      ddTarget = targetDate.substring(11, 12);
    } else {
      ddTarget = targetDate.substring(10, 12);
    }

    let start = new Date(yyStart, mmStart, ddStart);
    let target = new Date(yyTarget, mmTarget, ddTarget);
    let present = new Date(yyNow, mmNow, ddNow);

    let stGap = start.getTime() - target.getTime(); // 현재 날짜에서 D-day의 차이를 구한다.
    let stResult = Math.floor(stGap / (1000 * 60 * 60 * 24)) * -1; // gap을 일(밀리초 * 초 * 분 * 시간)로 나눈다. 이 때 -1 을 곱해야 날짜차이가 맞게 나온다.

    let snGap = start.getTime() - present.getTime();
    let snResult = Math.floor(snGap / (1000 * 60 * 60 * 24)) * -1;

    this.safetyObj = [snResult, ymdNow, zhVal, stResult, startDate, targetDate];
  }
};

// 디폴트 값 설정

setTimeout(() => {
  this.welcomeObj = ["관리자님", "환영문구를\n설정해주세요."];
  this.calcSafety(this.safetyObj[2], this.safetyObj[4], this.safetyObj[5]);
}, 3000);

setInterval(() => {
  this.calcSafety(this.safetyObj[2], this.safetyObj[4], this.safetyObj[5]);
}, 1000 * 60 * 60 * 6);
