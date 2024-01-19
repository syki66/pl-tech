const id = document.querySelector(".input__1");
const password = document.querySelector(".input__2");
const conf = document.querySelector(".input__3");
const submit = document.querySelector(".input__4");
const check__id = document.querySelector("#check__id");
const check__password = document.querySelector("#check__password");
const check__confirm = document.querySelector("#check__confirm");

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
  if (!conf.value) {
    alert("비밀번호 확인을 입력해주세요.");
    return false;
  } else {
    if (regexSpace.test(conf.value)) {
      alert("비밀번호 확인에 공백은 허용되지 않습니다.");
      return false;
    }
    if (!regexAN.test(conf.value)) {
      alert("비밀번호 확인은 영문 대소문자 또는 숫자 값만 허용됩니다.");
      return false;
    }
  }

  if (password.value !== conf.value) {
    alert("비밀번호와 비밀번호 확인이 다릅니다.");
    return false;
  }
}

submit.onclick = function () {
  return checkForm();
};

let httpRequest = new XMLHttpRequest();

function idRequest() {
  if (!httpRequest) {
    alert("XMLHTTP 인스턴스를 만들 수가 없습니다.");
    return false;
  }
  httpRequest.onreadystatechange = fillIDContents;
  httpRequest.open("POST", "checkid");
  httpRequest.setRequestHeader("Content-Type", "application/json"); // 컨텐츠타입을 json으로
  httpRequest.send(JSON.stringify({ id: id.value }));
}

function fillIDContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      let res = JSON.parse(httpRequest.responseText);
      res.data
        ? (check__id.innerText = res.data)
        : (check__id.innerText = res.comment);
    }
  }
}

function passwordRequest() {
  if (!httpRequest) {
    alert("XMLHTTP 인스턴스를 만들 수가 없습니다.");
    return false;
  }
  httpRequest.onreadystatechange = fillPasswordContents;
  httpRequest.open("POST", "checkpassword");
  httpRequest.setRequestHeader("Content-Type", "application/json"); // 컨텐츠타입을 json으로
  httpRequest.send(JSON.stringify({ password: password.value }));
}

function fillPasswordContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      let res = JSON.parse(httpRequest.responseText);
      res.data
        ? (check__password.innerText = res.data)
        : (check__password.innerText = res.comment);
    }
  }
}

function confirmRequest() {
  if (!httpRequest) {
    alert("XMLHTTP 인스턴스를 만들 수가 없습니다.");
    return false;
  }
  httpRequest.onreadystatechange = fillConfirmContents;
  httpRequest.open("POST", "checkconfirm");
  httpRequest.setRequestHeader("Content-Type", "application/json"); // 컨텐츠타입을 json으로
  httpRequest.send(JSON.stringify({ confirm: conf.value }));
}

function fillConfirmContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      let res = JSON.parse(httpRequest.responseText);
      res.data
        ? (check__confirm.innerText = res.data)
        : (check__confirm.innerText = res.comment);
    }
  }
}

id.onfocus = function () {
  return idRequest();
};

id.onkeyup = function () {
  return idRequest();
};

password.onfocus = function () {
  return passwordRequest();
};

password.onkeyup = function () {
  return passwordRequest();
};

conf.onfocus = function () {
  return confirmRequest();
};

conf.onkeyup = function () {
  return confirmRequest();
};
