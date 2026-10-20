const v_container = document.querySelector('.vertical-carousel__container');
const v_slides = document.querySelectorAll('.vertical-carousel__item');
const v_margin = document.querySelectorAll('.link__container')[0].offsetTop;

v_slideHeight = v_slides[0].getBoundingClientRect().height;
v_slideHeight += v_margin;

let newsPtr = 0;
function v_slideNext(newsNum){
    newsArray = [];
    for (let i = 0; i < newsNum; i++) {
        newsArray.push( i - Math.floor(newsNum/2) );
    }

    if (newsNum % 2 == 0){
        v_container.style.bottom = `${(v_slideHeight * newsArray[newsPtr]) + (v_slideHeight/2) }px`;
    } else{
        v_container.style.bottom = `${v_slideHeight * newsArray[newsPtr]}px`;
    }

    if (newsPtr >= newsNum - 1){
        newsPtr = 0;
    } else{
        newsPtr += 1;
    }
    
}

// 뉴스 자동 슬라이드
// 여기서 rotationTime()은 carouselSettings.js에 있음
if (rotationTime()[1]){
    v_slideNext(v_slides.length);
    setInterval(() => {
        v_slideNext(v_slides.length);
    }, rotationTime()[1]);
}

// 크기를 다시 측정하되 현재 표시하는 뉴스와 다음 순서를 유지한다.
function resizeNews() {
    const position = (parseFloat(v_container.style.bottom) || 0) / v_slideHeight;
    v_slideHeight = v_slides[0].getBoundingClientRect().height +
        document.querySelector('.link__container').offsetTop;
    const transition = v_container.style.transition;
    v_container.style.transition = 'none';
    v_container.style.bottom = `${position * v_slideHeight}px`;
    void v_container.offsetHeight;
    v_container.style.transition = transition;
}

window.addEventListener('resize', resizeNews);
document.addEventListener('fullscreenchange', resizeNews);
