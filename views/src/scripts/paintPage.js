const rowCount = 12; // 페이지 중에서 최대 row 개수 이상 적으면 됨

const title = document.querySelector(".title");
const category = document.querySelectorAll(".category");

function paintPage(num) {
  const json = JSON.parse(localStorage.getItem("json"));
  let rowArray = [];
  for (i = 0; i < rowCount; i++) {
    rowArray.push(document.querySelectorAll(`.row__${i}`));
  }
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
      
      if (num == 8 && json.data[0][num][`row${rowIndex}`][i]){
        workerImg = `<img class="image" src="/worker/${json.data[0][num][`row${rowIndex}`][i]}">`;
        if (e.innerHTML == workerImg){
          console.log("true")
        } else{
          console.log("false")
          e.innerHTML = workerImg;
        }
      } else{
        e.innerText = json.data[0][num][`row${rowIndex}`][i];
      }
    });
  });
}

paintPage(pageNum - 1);
setInterval(() => {
  paintPage(pageNum - 1);
}, 1000);
