# pl-tech
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ftomato8160%2Fpl-tech&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

### 🏭 한국가스난방공사 VDU 웹 페이지 프로젝트 📺

**Since** : 2020. 11. 29.

**Collaborator**

| [<img src="https://avatars.githubusercontent.com/u/56227932?s=400&v=4" width="100">](https://github.com/tomato8160)| [<img src="https://avatars.githubusercontent.com/u/59393359?s=460&v=4" width="100">](https://github.com/syki66) | [<img src="https://avatars.githubusercontent.com/u/54519245?s=460&u=ee4ca64f715cef4cbf7458e881c9da80f740b138&v=4" width="100">](https://github.com/ybell1028) |
| :-----------------------------------: | :---------------------------------------: | :-------------------------------------: |

<br>

### [프론트엔드 파일 및 기능 설명 (링크)](https://github.com/syki66/pl-tech/blob/main/views/Frontend-desc.md)

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
