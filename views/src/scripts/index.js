// 외부 html 파일 div 내부로 임포트하기 // 여기서 슬라이드 순서 변경 가능
document.querySelectorAll('.carousel__item').forEach((e,i)=>{
    e.innerHTML=`<object type="text/html" data="/views/src/pages/${i+1}.html" ></object>`;
});

// 해상도 읽어오기
let screenWidth  = window.screen.width,
    screenHeight = window.screen.height;

// 출력물을 16:9 풀스크린으로 // 16:9 비율로 작은쪽 해상도로 자동변환
function autoAdjustScreenSize(width, height){
    if (height < (width * 9 / 16)){
        return [(height * 16 / 9), height];
    }
    else if (height > (width * 9 / 16)) {
        return [width, (width * 9 / 16)];
    }
    else{
        return [width, height];
    }
}
let pageWidth = autoAdjustScreenSize(screenWidth, screenHeight)[0];
let pageHeight = autoAdjustScreenSize(screenWidth, screenHeight)[1];

console.log(`현재 모니터의 해상도 : ${screenWidth} x ${screenHeight}`)
console.log(`슬라이드 출력 해상도 : ${pageWidth} x ${pageHeight}`)

document.documentElement.style.setProperty('--width', `${pageWidth}px`);
document.documentElement.style.setProperty('--height', `${pageHeight}px`);


// vw 정의
let vw = pageWidth / 100;

// indicator
document.documentElement.style.setProperty('--navBottomPosition', `${5 * vw}px`);
document.documentElement.style.setProperty('--indicatorWidth', `${2.5 * vw}px`);
document.documentElement.style.setProperty('--indicatorHeight', `${1 * vw}px`);
// prev next buttons
document.documentElement.style.setProperty('--sideBtnWidth', `${5 * vw}px`);


// 제목
document.documentElement.style.setProperty('--titleFontSize', `${3.3 * vw}px`);
document.documentElement.style.setProperty('--titleTop', `${0.7 * vw}px`);
document.documentElement.style.setProperty('--titleLeft', `${5.4 * vw}px`);
document.documentElement.style.setProperty('--titleTextShadow', `${0.15 * vw}px`);
// 시계
document.documentElement.style.setProperty('--clockFontSize', `${2.4 * vw}px`);
document.documentElement.style.setProperty('--clockRight', `${3.7 * vw}px`);
document.documentElement.style.setProperty('--clockTop', `${1.1 * vw}px`);
document.documentElement.style.setProperty('--clockTextShadow', `${0.1 * vw}px`);