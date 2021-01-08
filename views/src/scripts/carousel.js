const carousel = document.querySelector('.carousel');
const container = document.querySelector('.carousel__container');
const slides = document.querySelectorAll('.carousel__item');
const slideWidth = slides[0].getBoundingClientRect().width;
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const navigation = document.querySelector('.carousel__nav');

// 슬라이드들을 가로 1줄로 정렬
let slidePointer = [];
slides.forEach((e, i) => {
    e.style.left = `${slideWidth * i}px`;
    slidePointer.push(e.style.left)
})

// 다음 슬라이드로 넘기기
function slideNext () {
    (current >= slidePointer.length-1) ? (current = 0) : (current += 1);
    container.style.transform = `translateX(-${slidePointer[current]})`;
}

// 이전 슬라이드로 넘기기
function slidePrev() {
    (current <= 0) ? (current = slidePointer.length - 1) : (current -= 1);
    container.style.transform = `translateX(-${slidePointer[current]})`;
}

// 버튼 리스너
let current = 0;
nextBtn.addEventListener('click', () => slideNext());
prevBtn.addEventListener('click', () => slidePrev());

// 네비게이션 html 요소 추가
slidePointer.map((e, i) => {
    var indicator = document.createElement("div");
    indicator.classList.add("carousel__indicator");
    if (i == 0){
        indicator.classList.add('current__carousel');
    }
    navigation.appendChild(indicator);
});

// 네이게이션 위치 조절
const navWidth = navigation.getBoundingClientRect().width;
const indicatorWidth = document.querySelector(".carousel__indicator").getBoundingClientRect().width;
navigation.style.transform = `translateX(-${navWidth/2}px)`;

// 네비게이션에서 원하는곳 골라서 클릭할수 있도록함
const indicatorArray = document.querySelectorAll('.carousel__indicator');
indicatorArray.forEach((each, i)=>{
    each.addEventListener('click', ()=>{
        container.style.transform = `translateX(-${slidePointer[i]})`;
        current = i;
    });
});

// 네비게이션에 현재 슬라이드 위치 표시
carousel.addEventListener('click', ()=>{
    indicatorArray.forEach((e,i)=>{
        indicatorArray[i].classList.remove('current__carousel');
    });
    indicatorArray[current].classList.add('current__carousel');
});

// 재생, 일시정지, 자동재생 기능
const pauseBtn = document.querySelector('.carousel__pause');
const playPauseImg = document.querySelector('.play-pause__img');

// 자동 슬라이드 기능
// 여기서 rotationTime()은 carouselSettings.js에 있음
let rotation = setInterval(() => {
    nextBtn.click();
}, rotationTime()[0]);

// 만약 index.html 요소를 클릭할경우 로테이션 시간 초기화
document.body.onmousedown = function() { 
    if (pauseBtn.classList.contains('play')){
        clearInterval(rotation);
        rotation = setInterval(() => {
            nextBtn.click();
        }, rotationTime()[0]);
    } else{
        clearInterval(rotation);
    }
}

// pause-play
pauseBtn.style.transform = `translateX(-${navWidth/2}px)`;
pauseBtn.addEventListener('click', ()=>{
    if (pauseBtn.classList.contains('play')){
        pauseBtn.classList.remove('play');
        pauseBtn.classList.add('pause');
        playPauseImg.src = "/views/src/images/play.svg";
        clearInterval(rotation);
    } else{
        pauseBtn.classList.remove('pause');
        pauseBtn.classList.add('play');
        playPauseImg.src = "/views/src/images/pause.svg";
        clearInterval(rotation);
        rotation = setInterval(() => {
            nextBtn.click();
        }, rotationTime()[0]);

    }
});

// 새로고침 기능
const refreshBtn = document.querySelector('.carousel__refresh');
const refreshImg = document.querySelector('.refresh__img');

refreshBtn.style.transform = `translateX(${navWidth/2}px)`;
refreshBtn.onmouseup = function refresh(){window.location.reload()}
