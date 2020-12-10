const rowCount = 12; // 페이지 중에서 최대 row 개수 이상 적으면 됨

const title = document.querySelector('.title');
let rowArray = [];
for (i=0; i<rowCount; i++){
    rowArray.push(document.querySelectorAll(`.row__${i}`));
}

function paintPage(json, num){
    title.innerText = json.data[num].itemname;
    rowArray.forEach((row, rowIndex) => {
        row.forEach((e, i) => {
            console.log(e)
            e.innerText = json.data[num][`row${rowIndex}`][i];
            })
    })
}

const json = JSON.parse(localStorage.getItem('json'));

paintPage(json, pageNum-1);