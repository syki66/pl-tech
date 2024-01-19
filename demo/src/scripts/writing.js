const title = document.querySelector(".input__1");
const content = document.querySelector(".input__2");
const submit = document.querySelector(".input__3");

function checkForm() {
  if (!title.value) {
    alert("제목을 입력해주세요.");
    return false;
  }
  if (!content.value) {
    alert("내용을 입력해주세요.");
    return false;
  }
}

submit.onclick = function () {
  return checkForm();
};
