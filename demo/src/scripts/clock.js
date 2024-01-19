const clock = document.querySelector(".clock__container")

const YY = document.querySelector('.year'); // 1페이지의 제목의 "연도"
const MM = document.querySelector('.month'); // 1페이지의 제목의 "월"

days = ["일", "월", "화", "수", "목", "금", "토"];

function getTime() {
    // const timestamp = JSON.parse(localStorage.getItem('json')).timestamp; // 서버 시간 설정
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const today = date.getDate();
    const day = date.getDay(); // 요일
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    
    const theDate = `${year}-${month < 10 ? `0${month}` : month}-${today < 10 ? `0${today}` : today}(${days[day]})`;
    const theClock = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; 

    clock.innerText = `${theDate} ${theClock}`;
    
    // 1페이지에만 연도와 월 대입하기
    if (YY){
        YY.innerText = `${year}년 `;
    }
    if (MM){
        MM.innerText = `${month}월 `;
    }
    
}

// 갱신 시간 설정
function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();