const id = document.querySelector(".input__1");
const password = document.querySelector(".input__2");
const submit = document.querySelector(".input__3");

// 입력 폼 체크
// 길이는 체크하지 않는다
function checkForm() {
  const regexSpace = /\s/;
  const regexAN = /^[a-z|A-Z|0-9]+$/;
  if (!id.value) {
    alert("ID를 입력해주세요.");
    return false;
  } else {
    if (regexSpace.test(id.value)) {
      alert("ID에 공백은 허용되지 않습니다.");
      return false;
    }
    if (!regexAN.test(id.value)) {
      alert("ID는 영문 대소문자 또는 숫자 값만 허용됩니다.");
      return false;
    }
  }
  if (!password.value) {
    alert("비밀번호를 입력해주세요.");
    return false;
  } else {
    if (regexSpace.test(password.value)) {
      alert("비밀번호에 공백은 허용되지 않습니다.");
      return false;
    }
    if (!regexAN.test(password.value)) {
      alert("비밀번호는 영문 대소문자 또는 숫자 값만 허용됩니다.");
      return false;
    }
  }
}

submit.onclick = function () {
  return checkForm();
};
