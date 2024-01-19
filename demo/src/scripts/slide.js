const json = JSON.parse(localStorage.getItem("json"));
slide_t = json.data[1][0]["row1"][0];
news_t = json.data[1][0]["row2"][0];

const sHour = document.querySelector(".sHour");
const sMinute = document.querySelector(".sMinute");
const sSecond = document.querySelector(".sSecond");

const nHour = document.querySelector(".nHour");
const nMinute = document.querySelector(".nMinute");
const nSecond = document.querySelector(".nSecond");

const cBoxes = document.querySelectorAll(".check-box");
const resultBox = document.querySelector(".result-box");
const allBtn = document.querySelectorAll(".all-btn");

sHour.value = parseInt(slide_t / 3600);
sMinute.value = parseInt((slide_t % 3600) / 60);
sSecond.value = parseInt(slide_t % 60);

nHour.value = parseInt(news_t / 3600);
nMinute.value = parseInt((news_t % 3600) / 60);
nSecond.value = parseInt(news_t % 60);

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

let cBoxArray = [];
function checkItem(e) {
  const eId = e.id.split("check")[1];
  e.checked == true ? cBoxArray.push(eId) : cBoxArray.remove(eId);
  resultBox.value = cBoxArray;
}
function allBtnToggle(element) {
  if (element.value == "전체 선택") {
    element.value = "전체 해제";
    cBoxes.forEach((e) => {
      if (e.checked == false) {
        e.click();
      }
    });
  } else {
    element.value = "전체 선택";
    cBoxes.forEach((e) => {
      if (e.checked == true) {
        e.click();
      }
    });
  }
}

const regexSpace = /\s/;
const regexCheckResult = /^([1-9]{1},)+[1-9]{1}$/;
const regexMinuteSecond = /^([0-9]|[1-5][0-9])$/;
const regexHour = /^([0-9]|1[0-9]|2[0-4])$/;

const submitOrder = document.querySelector(".apply-btn__1");
const submitLotation = document.querySelector(".apply-btn__2");
const submitNews = document.querySelector(".apply-btn__3");

function checkOrderForm() {
  if (!resultBox.value) {
    alert("슬라이드 순서를 체크박스로 지정해주세요.");
    return false;
  } else {
    if (regexSpace.test(resultBox.value)) {
      alert("슬라이드 순서 값에 공백은 허용되지 않습니다.");
    } else if (!regexCheckResult.test(resultBox.value)) {
      alert("슬라이드 순서 값은 숫자와 콤마 값만 허용됩니다.");
      return false;
    }
  }
}

submitOrder.onclick = function () {
  return checkOrderForm();
};

function checkLotationForm() {
  let sHMS = [sHour, sMinute, sSecond];
  let i = 0;
  for (i; i < sHMS.length; ++i) {
    if (!sHMS[i].value) {
      alert("슬라이드 순환 시간을 빈칸에 입력해주세요.");
      break;
    } else {
      if (regexSpace.test(sHMS[i].value)) {
        alert("슬라이드 순환 시간을 값에 공백은 허용되지 않습니다.");
        break;
      }
      if (i <= 0 && !regexHour.test(sHMS[i].value)) {
        alert("슬라이드 순환 시간 시는 0 - 24 사이의 숫자값입니다.");
        break;
      } else if (i > 0 && !regexMinuteSecond.test(sHMS[i].value)) {
        alert("슬라이드 순환 시간 분, 초는 0 - 59 사이의 숫자값입니다.");
        break;
      }
    }
  }
  if (i < sHMS.length) return false;

  //   sHMS.forEach((e, i) => {
  //     if (!e.value) {
  //       alert("슬라이드 순환 시간을 빈칸에 입력해주세요.");
  //       return false;
  //     } else {
  //       if (regexSpace.test(e.value)) {
  //         alert("슬라이드 순환 시간을 값에 공백은 허용되지 않습니다.");
  //         return false;
  //       }
  //       if (i <= 0) {
  //         if (!regexHour.test(e.value)) {
  //           alert("슬라이드 순환 시간 시는 0 - 24 사이의 숫자값입니다.");
  //           return false;
  //         }
  //       } else {
  //         if (!regexMinuteSecond.test(e.value)) {
  //           alert("슬라이드 순환 시간 분, 초는 0 - 59 사이의 숫자값입니다.");
  //           return false;
  //         }
  //       }
  //     }
  //   });

  //   if (!(sHour.value && sMinute.value && sSecond)) {
  //     alert("슬라이드 순환 시간을 빈칸에 입력해주세요.");
  //     return false;
  //   } else {
  //     if (
  //       regexSpace.test(sHour.value) ||
  //       regexSpace.test(sMinute.value) ||
  //       regexSpace.test(sSecond.value)
  //     ) {
  //       alert("슬라이드 순환 시간을 값에 공백은 허용되지 않습니다.");
  //       return false;
  //     } else if (!regexHour.test(sHour.value)) {
  //       alert("슬라이드 순환 시간 시는 0 - 24 사이의 숫자값입니다.");
  //       return false;
  //     } else if (
  //       regexMinuteSecond.test(sMinute.value) ||
  //       regexMinuteSecond.test(sSecond.value)
  //     ) {
  //       alert("슬라이드 순환 시간 분, 초는 0 - 59 사이의 숫자값입니다.");
  //       return false;
  //     }
  //   }
}

submitLotation.onclick = function () {
  return checkLotationForm();
};

function checkNewsForm() {
  let nHMS = [nHour, nMinute, nSecond];
  let i = 0;
  for (i; i < nHMS.length; ++i) {
    if (!nHMS[i].value) {
      alert("뉴스탭 순환 시간을 빈칸에 입력해주세요.");
      break;
    } else {
      if (regexSpace.test(nHMS[i].value)) {
        alert("뉴스탭 순환 시간을 값에 공백은 허용되지 않습니다.");
        break;
      }
      if (i <= 0 && !regexHour.test(nHMS[i].value)) {
        alert("뉴스탭 순환 시간 시는 0 - 24 사이의 숫자값입니다.");
        break;
      } else if (i > 0 && !regexMinuteSecond.test(nHMS[i].value)) {
        alert("뉴스탭 순환 시간 분, 초는 0 - 59 사이의 숫자값입니다.");
        break;
      }
    }
  }
  if (i < nHMS.length) return false;
}

submitNews.onclick = function () {
  return checkNewsForm();
};
