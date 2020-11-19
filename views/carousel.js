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

// 버튼 리스너
let current = 0;
nextBtn.addEventListener('click', ()=>{
    (current >= slidePointer.length-1) ? (current = 0) : (current += 1);
    container.style.transform = `translateX(-${slidePointer[current]})`;
    // console.log(current);
});

prevBtn.addEventListener('click', ()=>{
    (current <= 0) ? (current = slidePointer.length - 1) : (current -= 1);
    container.style.transform = `translateX(-${slidePointer[current]})`;            
    // console.log(current);
});

// 네비게이션
slidePointer.map((e, i) => {
    var indicator = document.createElement("div");
    indicator.classList.add("carousel__indicator");
    if (i == 0){
        indicator.classList.add('current__carousel');
    }
    navigation.appendChild(indicator);
});

const navWidth = navigation.getBoundingClientRect().width;
const indicatorWidth = document.querySelector(".carousel__indicator").getBoundingClientRect().width;
navigation.style.transform = `translateX(-${navWidth/2}px)`;

carousel.addEventListener('click', ()=>{
    const navArray = document.querySelectorAll('.carousel__indicator');
    navArray.forEach((e,i)=>{
        navArray[i].classList.remove('current__carousel');
    });
    navArray[current].classList.add('current__carousel');

});




        // 동적으로 크기 바뀌게 하려면 이걸로
        // function getSliderSize (){
        //     const sliderWidth = sliderBox.offsetWidth;
        //     const sliderHeight = sliderBox.offsetHeight;
        //     console.log(sliderWidth);
        //     console.log(sliderHeight);
        // }

        // // window.onresize = function () {
        // //     getSliderSize();
        // // }

        // const sliderWidth = sliderBox.offsetWidth;
        
        

        // 방향 버튼 적당한 svg 아이콘찾기
        // 아래쪽 스크롤 숨기기
        // hover 시 돌아가는거 멈추게 할지 말지