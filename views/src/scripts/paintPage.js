const rowCount = 100; // 페이지 중에서 최대 row 개수 이상 적으면 됨

const title = document.querySelector(".title"),
      category = document.querySelectorAll(".category");

function paintPage(num) {
  const json = JSON.parse(localStorage.getItem("json"));
  let rowArray = [];
  for (i = 0; i < rowCount; i++) {
    rowArray.push(document.querySelectorAll(`.row__${i}`));
  }
  if (num == "home"){// 페이지가 home일 경우, 뉴스탭 row 대입
    rowArray.forEach((row, rowIndex) => {
      row.forEach((e, i) => {
        if(json.data[0][6][`row${rowIndex}`]){
          e.innerText = json.data[0][6][`row${rowIndex}`][i];
          e.parentNode.href = `/board/${json.data[0][6][`row${rowIndex}`][3]}`;
        }
      });
    });
  } else{ // 기타 1~9 페이지일 경우
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
        try{ // 근무자 페이지에서 사진이 바뀌었다면 교체해줌
          if (num == 8 && i == 1 && json.data[0][num][`row${rowIndex}`][i]){
            workerImg = `<img class="image" src="/worker/${json.data[0][num][`row${rowIndex}`][i]}">`;
            if (e.innerHTML != workerImg){
              e.innerHTML = workerImg;
            }
          } else if (num == 6 && i == 2) { // 공지페이지 링크 걸기
            if(json.data[0][6][`row${rowIndex}`]){
              e.innerText = json.data[0][num][`row${rowIndex}`][i];
              e.href = `/board/${json.data[0][num][`row${rowIndex}`][3]}`;
            }
          } else{ // 나머지 페이지들에 row값 대입
            e.innerText = json.data[0][num][`row${rowIndex}`][i];
          }

        } catch (error){ // 근무자 페이지의 row값이 null값일경우 빈값 넣어주기
          // console.log(error);
          e.innerHTML = "";
        }
      });
    });
  }
}

// 페이지 갱신 시간 설정
paintPage(pageNum);
setInterval(() => {
  paintPage(pageNum);
}, 600000);