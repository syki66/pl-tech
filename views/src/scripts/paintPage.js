const rowCount = 12; // 페이지 중에서 최대 row 개수 이상 적으면 됨

const title = document.querySelector(".title"),
      category = document.querySelectorAll(".category");

function paintPage(num) {
  const json = JSON.parse(localStorage.getItem("json"));
  let rowArray = [];
  for (i = 0; i < rowCount; i++) {
    rowArray.push(document.querySelectorAll(`.row__${i}`));
  }
  if (num == "home"){
    rowArray.forEach((row, rowIndex) => {
      row.forEach((e, i) => {
        e.innerText = json.data[0][6][`row${rowIndex}`][i];
        e.parentNode.href = `/board/${json.data[0][6][`row${rowIndex}`][3]}`;
      });
    });
  } else{
    num -= 1;

    if (title){
      title.innerText = json.data[0][num].itemname;
    }
    if (category){
      category.forEach((e, i) => {
        e.innerText =
          num == 4 ? json.data[0][num].category[i % 3] : json.data[0][num].category[i];
      });
    }
    rowArray.forEach((row, rowIndex) => {
      row.forEach((e, i) => {
        try{
          if (num == 8 && i == 1 && json.data[0][num][`row${rowIndex}`][i]){
            workerImg = `<img class="image" src="/worker/${json.data[0][num][`row${rowIndex}`][i]}">`;
            if (e.innerHTML != workerImg){
              e.innerHTML = workerImg;
            }
          } else if (num == 6 && i == 2) {
              e.innerText = json.data[0][num][`row${rowIndex}`][i];
              e.href = `/board/${json.data[0][num][`row${rowIndex}`][3]}`;
          } else{
            e.innerText = json.data[0][num][`row${rowIndex}`][i];
          }

        } catch (error){
          // console.log(error);
          e.innerHTML = "";
        }
      });
    });
  }
}

paintPage(pageNum);
setInterval(() => {
  paintPage(pageNum);
}, 600000);