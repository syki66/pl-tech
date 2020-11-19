const container = document.querySelector('.carousel__container');
const slides = document.querySelectorAll('.carousel__item');
const slideWidth = slides[0].getBoundingClientRect().width;
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');

let slidePointer = [];
slides.forEach((e, i) => {
    e.style.left = `${slideWidth * i}px`;
    slidePointer.push(e.style.left)
})

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



        // const SHOWING_CLASS = "showing";
        // const firstSlide = document.querySelector('.sliderItem:first-child');
        // function slide() {
        //     const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
        //     if (currentSlide) {
        //         currentSlide.classList.remove(SHOWING_CLASS);
        //         const nextSlide = currentSlide.nextElementSibling;
        //         if (nextSlide) { // 마지막 슬라이드가 아닐때 다음슬라이드로 변경
        //             nextSlide.classList.add(SHOWING_CLASS);
        //         } else { // 마지막 슬라이드 일때 첫 슬라이드로 변경
        //             firstSlide.classList.add(SHOWING_CLASS);
        //         }
        //     } else {
        //         firstSlide.classList.add(SHOWING_CLASS);
        //     }
        // }
        // setInterval(slide,3000);

        // const sliderBox = document.querySelector('.sliderItem');






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