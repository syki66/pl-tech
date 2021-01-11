// 근무자 추가 입력 폼 체크
// 길이는 체크하지 않는다
const dep = document.querySelector(".add__container input[name=dep]");
const rank = document.querySelector(".add__container input[name=rank]");
const erum = document.querySelector(".add__container input[name=name]");
const submitAdd = document.querySelector(".input__5");

const regexDRN = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+$/;
const regexWorker = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+.[a-z|A-Z|0-9]+$/;

function checkAddForm() {
  if (!erum.value) {
    alert("이름을 입력해주세요.");
    return false;
  } else {
    if (!regexDRN.test(erum.value)) {
      alert("이름은 한글, 영어 대소문자, 숫자 값만 허용됩니다.");
      return false;
    }
  }
  if (!dep.value) {
    alert("부서명을 입력해주세요.");
    return false;
  } else {
    if (!regexDRN.test(dep.value)) {
      alert("부서명은 한글, 영어 대소문자, 숫자 값만 허용됩니다.");
      return false;
    }
  }
  if (!rank.value) {
    alert("직급을 입력해주세요.");
    return false;
  } else {
    if (!regexDRN.test(rank.value)) {
      alert("직급은 한글, 영어 대소문자, 숫자 값만 허용됩니다.");
      return false;
    }
  }
}

submitAdd.onclick = function () {
  return checkAddForm();
};

const dStaff = document.querySelector(".delete__container select[name=dStaff]");
const submitDel = document.querySelector(".input__6");

function checkDeleteForm() {
  if (!dStaff.value) {
    alert("삭제할 근무자를 선택해주세요.");
    return false;
  } else {
    if (!regexWorker.test(dStaff.value)) {
      alert("근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.");
      return false;
    }
  }
}

submitDel.onclick = function () {
  return checkDeleteForm();
};

const leader = document.querySelector(".select__container select[name=leader]");
const staff1 = document.querySelector(".select__container select[name=staff1]");
const staff2 = document.querySelector(".select__container select[name=staff2]");
const staff3 = document.querySelector(".select__container select[name=staff3]");
const submitSel = document.querySelector(".input__7");

function checkSelectForm() {
  if (!leader.value && !staff1.value && !staff2.value && !staff3.value) {
    alert("근무자를 최소 1명 선택해주세요.");
    return false;
  } else {
    if (leader.value) {
      if (!regexWorker.test(leader.value)) {
        alert("책임자의 근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.");
        return false;
      }
    }
    if (staff1.value) {
      if (!regexWorker.test(staff1.value)) {
        alert("사원1의 근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.");
        return false;
      }
    }
    if (staff2.value) {
      if (!regexWorker.test(staff2.value)) {
        alert("사원2의 근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.");
        return false;
      }
    }
    if (staff3.value) {
      if (!regexWorker.test(staff4.value)) {
        alert("사원3의 근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.");
        return false;
      }
    }
  }
}

submitSel.onclick = function () {
  return checkSelectForm();
};

// 파일 첨부 필터링
$(document).ready(function () {
  let fileTarget = $(".upload-hidden");
  let fileDisplay = $(".upload-name");

  fileDisplay.val("근무자 사진을 첨부해주세요. (jpg, jpeg, png)");

  $("#add__form").submit(function () {
    if (fileTarget.val() == "") {
      alert("근무자 사진을 첨부해주세요.");
      fileTarget.focus();
      return false;
    } else return true;
  });

  fileTarget.change(function () {
    let fakepath = this.value.search(/fakepath.*/);
    let filename = "";
    if (fakepath) {
      filename = this.value;
      filename = filename.substring(fakepath + 9, filename.length);
    } else {
      alert("경로가 올바르지 않습니다.");
    }
    let ext = filename.split(".")[1].toLowerCase();
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
        fileDisplay.val(filename);
        break;
      default:
        alert("지원하지 않는 형식입니다.");
        this.value = "";
    }
  });
});

// FS로 읽어들인 파일리스트 select, option 태그에 적용

(async () => {
  const json = JSON.parse(localStorage.getItem("json"));
  json.data[0][8][`row${0}`]
    ? (leader.value = json.data[0][8][`row${0}`][1])
    : false;
  json.data[0][8][`row${1}`]
    ? (staff1.value = json.data[0][8][`row${1}`][1])
    : false;
  json.data[0][8][`row${2}`]
    ? (staff2.value = json.data[0][8][`row${2}`][1])
    : false;
  json.data[0][8][`row${3}`]
    ? (staff3.value = json.data[0][8][`row${3}`][1])
    : false;
})();
