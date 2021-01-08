# 프론트엔드 파일 및 기능 설명

- 프론트 작업은 `/lib`, `/views` 두 디렉토리에서만 작업함
- 권장 해상도 : `1920`x`1080`

---

## js

- `index.js`
    - `해상도에 상관없이` 깨짐없는 `동일한 출력`을 할수 있게 도와줌 _(최소 1280 X 720 이상 권장)_
    - 사용자 모니터의 해상도를 읽어와서, 최적의 슬라이드 가로세로값을 반환해줌
    - html에서 이 파일을 불러오게 된다면, css에서 `calc(var(--width) / 100 * 값)` 형식으로 사용 가능, 값은 일반적인 `vw`와 같은 수치로 사용하면됨. *(16:9 비율이 아닌 모니터일 경우를 대비하여 `calc(var(--width) / 100 * 값)` 이 형식을 사용하는 것임)*

- `fetchJson.js`
    - json 데이터를 가져오는 곳
    - 가져온 json 데이터를 `로컬` 브라우저에 `저장`
    - fetch 시간 간격 설정 *(현재 600초)*

- `clock.js`
    - 로컬 타임스탬프를 이용하여 시간을 계산함
    - `.year` 클래스에 연도 대입 *(1페이지 제목)*
    - `.month` 클래스에 연도 대입 *(1페이지 제목)*
    - `.clock__container` 클래스에 시계 출력
    - 시간 설정 가능 *(현재 1초)*

- `/src/scripts/carousel.js`
    - index.html의 기본적인 슬라이드 기능
    - `이전` `다음` 버튼 기능
    - `인디케이터` 동적 생성 및 기능 부여
    - `새로고침`, `재생`, `일시정지`, `자동재생` 기능 *(표시 위치는 동적으로 계산됨)*

- `/src/scripts/carouselSettings.js`
    - index.html의 `.carousel__container` 내부에 슬라이드를 동적 생성
    - 슬라이드 `표출` 설정
    - 슬라이드 `개수` 설정
    - 슬라이드 `순서` 설정
    - 슬라이드 `로테이션 시간` 설정

- `jquery-ui.min.js`, `jquery.min.js`
    - 인트라넷에서는 외부 jquery 스크립트를 가져올수 없기에 내부로 불러옴
    - `무재해 설정 페이지`에서만 쓰임

- `paintPage.js`
    - `fetchJson.js`로 가져온 json 값을 바탕으로 각 값들을 페이지들에 뿌려줌
    - num값을 받아서 페이지를 식별 *(`num == home`은 메인페이지 뉴스 설정)*
    - `title`과 `category`를 대입해주며, `row`의 경우 아래와 같이 대입함
        - json에 `row0`, `row1`, `row2` 값이 , html의 `row__0`, `row__1`, `row__2` 클래스를 가진 요소에 각각 대입됨
        - json의 만약 `row0`의 값이 3개라면, html의 `row__0`을 가진 3개의 요소에 차례대로 들어가게됨
    - 만약 json의 `row숫자`의 값들이 많아질 경우, `rowCount` 변수를 수동으로 조정해주어야됨
        - 예를들어, row0의 개수가 30개가 되었다면 `rowCount`에 30이상을 대입해주어야 함 *(처음부터 여유롭게 값을 100, 1000 정도로 메겨도, 성능상의 문제만 없다면 상관없음)*
    - 시간 간격 설정 *(현재 600초이며, `fetchJson.js와 시간을 동일하게 설정해 놓는것을 권장`)*

- `vertical-carousel.js`
    - 뉴스탭 슬라이드 기능

---

## html

- `/views/index.html` : 메인페이지
- `/views/src/pages` : 각 슬라이드에 보여지는 페이지들

---

## css

- 요소의 `크기를 변경`할 경우 아래와 같이 해야 `해상도가 제대로 적용`됨 *(메인 슬라이드만 `vw` 사용가능하고, 나머지는 `calc` 이용해야됨)*
    - /views/src/pages 9개는 정적 html : `값 vw`
    - /views 7개 정적 html : `calc(var(--width) / 100 * 값)`
    - /lib : `calc(var(--width) / 100 * 값)`
- 불필요한 경우나 공통적인 부분을 제외하고서는 html에서 css를 분리하지 않았음
- `/lib`에 적용되는 css는 `views/src/styles/template`에 있음
- 메인페이지의 슬라이드 요소 크기 설정 `/views/src/styles/carousel.css`
    - `--sideBtnWidth` : 이전, 다음 버튼 가로 길이
    - `--indicatorWidth` : 하단 인디케이터 가로 길이
    - `--indicatorHeight` : 하단 인디케이터 세로 길이
    - `--indicatorMargin` : 하단 인디케이터 마진값
    - `--navBottomPosition` : 하단 인디케이터들의 위치 설정
- 제목 및 시계 전역설정 `/views/src/style/page.css`
    - `--titleFontSize` : 제목 글씨 사이즈
    - `--titleTop` : 제목 상단 여백 설정
    - `--titleLeft` : 제목 왼쪽 여백 설정
    - `--titleTextShadow` : 제목 그림자효과 길이 설정
    - `--clockFontSize` : 시계 글씨 사이즈
    - `--clockRight` : 시계 오른쪽 여백 설정
    - `--clockTop` : 시계 상단 여백 설정
    - `--clockTextShadow` : 시계 그림자 효과 길이 설정