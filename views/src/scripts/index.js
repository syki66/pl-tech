// 해상도 읽어오기
let screenWidth = window.screen.width,
  screenHeight = window.screen.height;

// 출력물을 16:9 풀스크린으로 // 16:9 비율로 작은쪽 해상도로 자동변환
function autoAdjustScreenSize(width, height) {
  if (height < (width * 9) / 16) {
    return [(height * 16) / 9, height];
  } else if (height > (width * 9) / 16) {
    return [width, (width * 9) / 16];
  } else {
    return [width, height];
  }
}
let pageWidth = autoAdjustScreenSize(screenWidth, screenHeight)[0];
let pageHeight = autoAdjustScreenSize(screenWidth, screenHeight)[1];

document.documentElement.style.setProperty("--width", `${pageWidth}px`);
document.documentElement.style.setProperty("--height", `${pageHeight}px`);