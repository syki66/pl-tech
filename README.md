# pl-tech
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ftomato8160%2Fpl-tech&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

### 🏭 한국가스난방공사 VDU 웹 페이지 프로젝트 📺

**Since** : 2020. 11. 29.

**Collaborator**

| [<img src="https://avatars.githubusercontent.com/u/56227932?s=400&v=4" width="100">](https://github.com/tomato8160)| [<img src="https://avatars.githubusercontent.com/u/59393359?s=460&v=4" width="100">](https://github.com/syki66) | [<img src="https://avatars.githubusercontent.com/u/54519245?s=460&u=ee4ca64f715cef4cbf7458e881c9da80f740b138&v=4" width="100">](https://github.com/ybell1028) |
| :-----------------------------------: | :---------------------------------------: | :-------------------------------------: |

<br>

## 🏠 /home

<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106376412-698f0b00-63d8-11eb-95b8-7f8352e52c20.gif">
</p>
 
* 프로젝트 루트 폴더에 있는 DCS_Val.csv 파일을 파싱하여 테이블 슬라이드에 적용시켜 보여줍니다.

* 슬라이드 네비게이션에 있는 Play/Pause 버튼으로 슬라이드 전환을 시작, 일시정지 시킬 수 있습니다.

<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106376364-069d7400-63d8-11eb-8c5c-3ad42461c064.gif">
</p>

* 슬라이드 네비게이션으로 각 슬라이드로 한번에 이동할 수 있습니다.

* 슬라이드 네비게이션에 있는 Refresh 버튼으로 슬라이드를 새로고침할 수 있습니다.

<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106376878-6c8bfa80-63dc-11eb-90d7-1d0d4be3a088.gif">
</p>


* 게시판 주요 업무와 하단 뉴스탭을 클릭함으로써 해당 공지를 확인 할 수 있습니다.

* 슬라이드 기본 전환 시간은 8초, 뉴스탭 기본 전환 시간은 6초 입니다.

## 🔑 /auth


<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106377340-ce019880-63df-11eb-92c1-c26b79f001b2.png">
</p>

* /login
  * 로그인 화면입니다.


<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106377363-fd180a00-63df-11eb-9c08-7a0da90a1613.gif">
</p>

* /register
  * 회원가입 화면입니다.
  * AJAX를 사용하여 focus를 시작으로 입력마다 ID의 중복 여부와 비밀번호, 비밀번호의 유효성 검사를 진행합니다.
  
## 🛠 /admin

<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106377342-ce9a2f00-63df-11eb-9276-1a21a6c1978d.png">
</p>

* / 
  * 관리자 설정 페이지 메인화면입니다.
  * 메뉴를 클릭하면 각 기능 설정 페이지로 이동합니다.


<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106377343-cf32c580-63df-11eb-83fe-cf766dfe399d.png">
</p>

* /admin/notice 
  * 공지 작성 페이지입니다.


<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106377344-cfcb5c00-63df-11eb-99df-9db6bedb7d0b.png">
</p>

* /admin/manage 
  * 공지 관리 페이지입니다.
  * 공지를 클릭하면 수정 페이지로 이동하고 삭제 버튼으로 공지를 지울 수 있습니다.
  
<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106377345-d063f280-63df-11eb-9b3f-d1103c4e56d3.png">
</p>

* /admin/welcome
  * 슬라이드 6페이지인 환영 문구를 설정할 수 있는 페이지입니다.
  
<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106377346-d063f280-63df-11eb-8e52-caae55ce31a5.png">
</p>

* /admin/safety
  * 슬라이드 8페이지인 무재해 기록판를 설정할 수 있는 페이지입니다.
  
<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106377347-d0fc8900-63df-11eb-9edb-28e56e8ee229.png">
</p>

* /admin/worker
  * 슬라이드 9페이지인 근무자 현황를 설정할 수 있는 페이지입니다.
  
<p align="center">
  <img src="https://user-images.githubusercontent.com/54519245/106377339-ccd06b80-63df-11eb-86c7-70d69c7971ed.png">
</p>

* /admin/worker
  * 슬라이드 페이지 순서와 전환 시간, 뉴스탭의 전환 시간을 설정할 수 있는 페이지입니다.

<br />

---

<br />

## 상세 기능 구현 설명

- MVC 패턴을 사용하여 제작
- vanilla Javascript와 순수한 CSS를 이용하여 Carousel, 수직 Carousel 구현
- 윈도우 및 크롬 환경 기준으로 제작됨
- 해상도
  - 전체화면 기준으로 제작하였고, 해상도가 다르더라도 보여지는 화면은 완벽히 동일할 수 있게 구현함
  - 모니터 종류에 상관없이 16:9 비율을 유지하며, 레터박스가 가장 적은 방향으로 자동으로 해상도 변경 (새로고침 시)
- Carousel, 수직 Carousel 구현
  - 자동 슬라이드, 재생, 일시정지 기능
  - 자동 슬라이드 시, 화면에 액션이 발생했을 경우 자동 슬라이드의 대기시간이 초기화 됨 (작업 중 페이지 자동 넘김 방지)
  - 자동 슬라이드 순환 시간, 슬라이드 화면 순서, 개수 및 표시 여부 변경 가능
  - 이전, 다음 버튼으로 슬라이드 이동 기능
  - 하단 네비게이션 버튼
    - 슬라이드 개수에 따라 동적 생성 (개수, 위치 등)
    - 현재 슬라이드 위치 표시
    - 원하는 슬라이드로 즉시 이동
    - 재생, 일시정지, 새로고침 가능
  - 하단 뉴스탭은 수직 방향의 Carousel로 구현
    - 수직 Carousel도 순환 시간 설정 가능
- 슬라이드
  - 하단 뉴스 탭 표시, 클릭하면 해당 뉴스로 이동
  - 날짜 및 시간 표시 (연도, 월, 일, 요일, 시, 분, 초)
  - 각 슬라이드는 독립된 html로 구성되어 있고, Object 태그를 이용해서 외부 html들을 Carousel에 삽입함
    - html의 개수가 늘어나면 자동으로 슬라이드에 추가됨
  - 각 슬라이드는 미리 제작된 배경을 적용하고 Table, absolute position 등을 활용해서 데이터 위치를 오차 없이 정확히 맞춤
  - 공지 페이지에서는 공지를 누르면 사용자가 공지를 바로 읽을 수 있고, 공지 리스트도 볼 수 있게 구성
- 데이터 처리
  - 서버에서 10분마다 데이터를 받아와서, LocalStorage에 저장하여 활용함
  - 서버에서 받아오는 2차원 데이터가 추가, 삭제될 경우에 자동으로 대응 가능하도록 코드 작성
  - 모든 데이터는 서버에서 받아온 값으로 동적으로 변경됨 (수치, 제목, 카테고리, 공지, 근무자)
  - 서버 응답 실패 시 경고 표시 등 예외처리
- 관리자 페이지
  - 관리자 메뉴
    - 공지 작성
    - 공지 관리
    - 환영문구 작성
    - 무재해 기록판 설정
    - 근무자 현황 관리
    - 슬라이드 관리
  - 공지 목록 페이지
    - 페이지네이션 기능
    - 공지 삭제 기능
  - 공지 등록 및 수정 페이지
    - 제목 및 내용 작성 가능
    - 최대 입력 글자 제한
  - 관리자 로그인, 회원가입 페이지
  - 근무자 현황 관리 페이지
    - 근무자 정보(부서, 직급, 이름, 사진) 추가, 삭제 기능
    - 근무자를 4명까지 선택하여 슬라이드에 표시 가능
  - 슬라이드 및 뉴스탭 관리 페이지
    - 슬라이드와 뉴스탭 순환 시간 조절 가능
    - 슬라이드 화면 순서, 개수 및 표시 여부 변경 가능

<br />

---

<br />

## 프론트엔드 파일 및 기능 설명

- 프론트 작업은 `/lib`, `/views` 두 디렉토리에서만 작업함
- 권장 해상도 : `1920`x`1080`

<br />

### js

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

<br />

### html

- `/views/index.html` : 메인페이지
- `/views/src/pages` : 각 슬라이드에 보여지는 페이지들

<br />

### css

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

<br />

---

<br />

## 실행 방법

1. git 설치
2. git clone https://github.com/syki66/pl-tech.git (CRLF 때문에 ZIP으로 다운받으면 오류남)
3. keys폴더를 생성하고 `private.pem` 및 `public.pem` 파일을 넣어줌
4. node.js `13.10.1` 설치
5. python `3.10.0` 설치 (설치할때 환경변수 등록 체크)
6. visual studio 설치 (C++를 사용한 데스크톱 개발)
7. MySQL8 설치 (Use Legacy Authentication Method 체크)
8. HeidiSQL 설치 -> New -> 유저 패스워드 입력 후 open -> 최상위 노드 오른쪽 클릭 -> 새로 생성 -> 데이터베이스 -> pltech 입력
9. `config/config.json`에서 3개, `routes/session.js`에서 1개 비밀번호 변경
10. npm install
11. npm install -g -s nodemon
12. git에 `nodemon` 입력하여 서버실행. (크롬으로 접속 권장 : `localhost/home`, `localhost/auth/login`)
