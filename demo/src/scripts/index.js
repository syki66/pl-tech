// 모니터 해상도 대신 현재 브라우저 창의 표시 영역을 사용한다.
let screenWidth = window.innerWidth,
  screenHeight = window.innerHeight;

// 창 안에 들어가는 가장 큰 16:9 크기.
function autoAdjustScreenSize(width, height) {
  if (height < (width * 9) / 16) {
    return [(height * 16) / 9, height];
  } else if (height > (width * 9) / 16) {
    return [width, (width * 9) / 16];
  } else {
    return [width, height];
  }
}

let pageWidth, pageHeight;

function adjustWindowSize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  [pageWidth, pageHeight] = autoAdjustScreenSize(screenWidth, screenHeight);

  document.documentElement.style.setProperty("--width", `${pageWidth}px`);
  document.documentElement.style.setProperty("--height", `${pageHeight}px`);
  document.documentElement.style.overflow = "hidden";
  document.body.style.width = `${pageWidth}px`;
  document.body.style.height = `${pageHeight}px`;
  document.body.style.margin = `${(screenHeight - pageHeight) / 2}px auto 0`;
  document.body.style.position = "relative";
  document.body.style.overflow = "hidden";
}

adjustWindowSize();
window.addEventListener("resize", adjustWindowSize);
document.addEventListener("fullscreenchange", adjustWindowSize);
