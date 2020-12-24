// .carousel__item 동적 생성
function createCarousel(){
    const container = document.querySelector(".carousel__container");
    const item = document.createElement('div');
    item.classList.add('carousel__item');
    container.appendChild(item);
  }

// 외부 html 파일 div 내부로 임포트
function placeCarousel(json){
document.querySelectorAll(".carousel__item").forEach((e, i) => {
    if (json.data[1][0] == null || !json.data[1][0][0]){
    e.innerHTML=`<object type="text/html" data="/views/src/pages/${i+1}.html" ></object>`;
    } else{
    e.innerHTML=`<object type="text/html" data="/views/src/pages/${json.data[1][0][i]}.html" ></object>`;
    }
});
};

// 순서 및 개수 변경
(function checkCarousel() {
    const json = JSON.parse(localStorage.getItem("json"));
    let carouselCnt = 9;
    (json.data[1][0] == null || !json.data[1][0][0]) ? (carouselCnt = 9) : (carouselCnt = json.data[1][0].length);
    
    for (let i = 0; i < carouselCnt; i++) {
        createCarousel();
    }
    placeCarousel(json);
})();

// 로테이션 시간값 받아오는 함수. 다른 js 에서 실행됨
function rotationTime(){
    //pass
    return [10000, 5000];
}