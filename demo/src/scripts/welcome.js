"use strict";
const visitor = document.querySelector(".input__1");
const sentence = document.querySelector(".input__2");
const submit = document.querySelector(".input__3");

// 기존에 저장된 값 불러와 뿌려주는 함수
(async () => {
  const json = JSON.parse(localStorage.getItem("json"));
  let temp = json.data[0][5][`row${0}`][0];
  if (temp !== "관리자님") {
    visitor.value = temp.substring(0, temp.length - 1);
    sentence.value = json.data[0][5][`row${1}`][0];
  }
})();

// 입력 폼 체크
// 길이는 체크하지 않는다
function checkForm() {
  if (!visitor.value) {
    alert("방문자명을 입력해주세요.");
    return false;
  }
  if (!sentence.value) {
    alert("환영문구를 입력해주세요.");
    return false;
  }
}

submit.onclick = function () {
  return checkForm();
};

function countUtf8Bytes(s) {
  var b = 0,
    i = 0,
    c;
  for (; (c = s.charCodeAt(i++)); b += c >> 11 ? 2 : c >> 7 ? 2 : 1);
  return b;
}

let prevItem = [visitor.value, sentence.value];

function maxByte(e, byte, id) {
  if (byte < countUtf8Bytes(e.value)) {
    e.value = prevItem[id];
  }
  prevItem[id] = e.value;
}

visitor.onkeyup = function () {
  maxByte(this, 16, 1);
};

sentence.onkeyup = function () {
  maxByte(this, 72, 0);
};
