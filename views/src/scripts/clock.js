const clock = document.querySelector(".clock__container")
// const clock_1 = document.querySelector(".js-clock__1");
// const clock_2 = document.querySelector(".js-clock__2");
// const clock_3 = document.querySelector(".js-clock__3");

const YY = document.querySelector('.year');
const MM = document.querySelector('.month');

days = ["일", "월", "화", "수", "목", "금", "토"];

function getTime() {
    const timestamp = JSON.parse(localStorage.getItem('json')).timestamp;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const today = date.getDate();
    const day = date.getDay(); // 요일
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    
    clock.innerText = `${year}-${month}-${today}(${days[day]}) ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    
    // clock_1.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`    
    // clock_2.innerText = `${days[day]}요일`
    // clock_3.innerText = `${year}.${month}.${today}`;
    
    
    if (YY){
        YY.innerText = `${year}년 `;
    }
    if (MM){
        MM.innerText = `${month}월 `;
    }
    
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();