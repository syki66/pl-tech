const container = document.querySelector('.carousel__container');
const slides = document.querySelectorAll('.carousel__item');
const slideWidth = slides[0].getBoundingClientRect().width;
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const navigation = document.querySelector('.carousel__nav');



// 슬라이드들 가로 1줄로 정렬
let slidePointer = [];
slides.forEach((e, i) => {
    e.style.left = `${slideWidth * i}px`;
    slidePointer.push(e.style.left)
})

// 슬라이드 버튼 리스터
let num = 0;
nextBtn.addEventListener('click', ()=>{
    (num >= slidePointer.length-1) ? (num = 0) : (num += 1);
    container.style.transform = `translateX(-${slidePointer[num]})`;
    console.log(num);
});

prevBtn.addEventListener('click', ()=>{
    (num <= 0) ? (num = slidePointer.length - 1) : (num -= 1);
    container.style.transform = `translateX(-${slidePointer[num]})`;            
    console.log(num);
});

// 슬라이드 네비게이션
slidePointer.map(() => {
    var indicator = document.createElement("div");
    indicator.classList.add("carousel__indicator");
    navigation.appendChild(indicator);
});

const navWidth = navigation.getBoundingClientRect().width;
const indicatorWidth = document.querySelector(".carousel__indicator").getBoundingClientRect().width;
navigation.style.transform = `translateX(-${navWidth/2}px)`;






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
        
        

        // 방향 버튼 그라데이션, 적당한 svg 아이콘찾기
        // 나중에 아래쪽 스크롤 숨기기
        // hover 시 돌아가는거 멈추게 할지 말지