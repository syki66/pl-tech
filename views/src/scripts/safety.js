// DatePicker 설정
$(function () {
  $.datepicker.setDefaults({
    dateFormat: "yy년 mm월 dd일",
    yearRange: "c-100:c+100",
    changeYear: true,
    changeMonth: true,
    prevText: "이전 달",
    nextText: "다음 달",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    showMonthAfterYear: true,
    yearSuffix: "년",
  });
  $(".input__2").datepicker({});
  $(".input__3").datepicker({});

  let now = new Date();
  let yyNow = now.getFullYear();
  let mmNow = now.getMonth() + 1;
  let ddNow = now.getDate();
  if (mmNow < 10) {
    mmNow = "0" + mmNow;
  }

  if (ddNow < 10) {
    ddNow = "0" + ddNow;
  }

  let ymdNow = yyNow + "년 " + mmNow + "월 " + ddNow + "일";

  const today = document.getElementById("date__1");
  today.innerText = ymdNow;
});

// 기존에 저장된 값 불러와 뿌려주는 함수
const zeroHazard = document.querySelector(".input__1");
const startDate = document.querySelector(".input__2");
const targetDate = document.querySelector(".input__3");
const submit = document.querySelector(".input__4");

(async () => {
  const json = JSON.parse(localStorage.getItem("json"));
  if (json.data[0][7][`row${2}`][0] !== "-") {
    zeroHazard.value = json.data[0][7][`row${2}`][0];
    startDate.value = json.data[0][7][`row${4}`][0];
    targetDate.value = json.data[0][7][`row${5}`][0];
  }
})();

function getFormatDate(date) {
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  var day = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "년 " + month + "월 " + day + "일"; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

// 입력 폼 체크
function checkForm() {
  const regexSpace = /\s/;
  const regexZH = /^([0-9]|[1-5][0-9])$/;
  const regexDate = /^(19|20)\d{2}년\s(0[1-9]|1[012])월\s(0[1-9]|[12][0-9]|3[0-1])일$/;
  let now = getFormatDate(new Date());
  if (!zeroHazard.value) {
    alert("무재해 배수를 입력해주세요.");
    return false;
  } else {
    if (regexSpace.test(zeroHazard.value)) {
      alert("무재해 배수에 공백은 허용되지 않습니다.");
      return false;
    }
    if (!regexZH.test(zeroHazard.value)) {
      alert("무재해 배수는 0 - 99 사이의 숫자값입니다.");
      return false;
    }
  }
  if (!startDate.value) {
    alert("시작 날짜를 입력해주세요.");
    return false;
  } else {
    if (!regexDate.test(startDate.value)) {
      alert("시작 날짜 값 형식(YYYY년 MM월 DD일)이 올바르지 않습니다.");
      return false;
    } else if (startDate.value > now) {
      alert("시작 날짜는 현재 날짜보다 빨라야 합니다.");
      return false;
    }
  }
  if (!targetDate.value) {
    alert("목표 날짜를 입력해주세요.");
    return false;
  } else {
    if (!regexDate.test(targetDate.value)) {
      alert("목표 날짜 값 형식(YYYY년 MM월 DD일)이 올바르지 않습니다.");
      return false;
    } else if (targetDate.value < now) {
      alert("목표 날짜는 현재 날짜보다 늦어야 합니다.");
      return false;
    }
  }
}

submit.onclick = function () {
  return checkForm();
};
