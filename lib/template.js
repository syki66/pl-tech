const util = require('../middleware/util');

// 용도 구분
// u : user - 일반 페이지
// c : common - 일반 & 관리자 페이지
// a : admin - 관리자 페이지

module.exports = {
    u_notice: function (title, contents, cdate, pageNum="") {
        // /board/:pageNum
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title> Notice </title>
            <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
            <link rel="stylesheet" href="/views/src/styles/adminPages.css">
            <script src="/views/src/scripts/fetchJson.js"></script>
        
            <link rel="stylesheet" href="/views/src/styles/template/board-num.css">
        </head>
        <body>
            <div class="container">
                <div class="clock__container"></div>
        
                <div class="title__container">
                    <span class="title"></span>
                </div>
        
                <div class="inner__container">
                    <h2>${title}</h2>
                    <div class="cdate">${cdate}</div>

                    <div class="content">${contents}</div>
                    <a class="link__1" href="/board${pageNum}">돌아가기</a>
                </div>
            </div>
        
            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
        </body>
        </html>


        `
    },

    u_noticeList: function (data) {
        // /board
        var list = `<ul>
                        <li>
                            <div class="date__container">날짜</div>
                            <div class="link__container title">제목</div>
                        </li>`;
        var i = 0;
        while (i < data.length) {
            var cdate = util.cdateParser(data[i].cdate);
            list = list + `<li>
                                <div class="date__container">${cdate.date} (${cdate.week})</div>
                                <div class="link__container">
                                    <a class="board__link" href="/board/${data[i].id}">${data[i].title}</a>
                                </div>
                        </li>`;
            i = i + 1;

        }
        list = list + '</ul>';

        return list;
    },

    u_board: function (list) {
        // /board
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>notice list</title>
            <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
            <link rel="stylesheet" href="/views/src/styles/adminPages.css">
            <script src="/views/src/scripts/fetchJson.js"></script>
        
            <link rel="stylesheet" href="/views/src/styles/template/board.css">
        </head>
        <body>
            <div class="container">
                <div class="clock__container"></div>
        
                <div class="title__container">
                    <span class="title"></span>
                </div>
        
                <div class="inner__container">
                    <h2>공지사항 게시판</h2>
                    ${list}
                    <a class="link__1" href="/admin">관리자 설정</a>
                    <a class="link__2" href="/board/more/1">공지사항 더보기</a>
                </div>
            </div>            

            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
        </body>
        </html>
        `
    },

    c_pageBar: function (pnum, pages) {
        // /admin/notice/manage/:pageNum
        // /board/more/:pageNum
        var pageBar = '';
        let i;
        let max;
        var right = false;
        var left = false;
        // 5페이지 이상
        if(pages>5){
            right = true;
            // pageNum 4 이상일 경우
            if(pnum>=4){
                left = true;
                i = pnum - 2;
                let gap = 0;
                if((pnum+2)>pages){
                    gap = (parseInt(pnum) + 2 - pages);
                }
                i = i - gap;
            }else{
                i = 1;
            }
            max = i + 5;

            if(left){
                pageBar = pageBar + `<a class="nav" href="${parseInt(pnum)-1}">◀</a>`;
            }
            while (i < max) {
                if(i==pnum){
                    pageBar = pageBar + `<a class="sel">[${i}]</a>`;    
                }else{
                    pageBar = pageBar + `<a class="nav" href="${i}">[${i}]</a>`;
                }
                i = i + 1;
            }
            if(right&&(parseInt(pnum)!==pages)){
                pageBar = pageBar + `<a class="nav" href="${parseInt(pnum)+1}">▶</a>`;
            }
        }
        // 5페이지 이하
        else{
            i = 1;
            max = pages;

            while (i <= max) {
                if(i==pnum){
                    pageBar = pageBar + `<a class="sel">[${i}]</a>`;    
                }else{
                    pageBar = pageBar + `<a class="nav" href="${i}">[${i}]</a>`;
                }
                i = i + 1;
            }
        }
        pageBar = `<div class="nav__container">${pageBar}</div>`

        return pageBar;
    },

    c_board: function (list, ptemplate, isAdminPage) {
        // /admin/post/manage/:pageNum
        // /board/more/:pageNum
        var template =`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
            `;
            template = template + (isAdminPage ? `
                    <title>관리자 설정 페이지 - 공지 관리</title>
            ` : `
                    <title>공지사항 더보기</title>
            `);
            template = template + `
                    <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
                    <link rel="stylesheet" href="/views/src/styles/adminPages.css">
                    <script src="/views/src/scripts/fetchJson.js"></script>
                
                    <link rel="stylesheet" href="/views/src/styles/template/board-list.css">
                </head>
                <body>
                    <div class="container">
                        <div class="clock__container"></div>
                
                        <div class="title__container">
                            <span class="title"></span>
                        </div>
                
                        <div class="inner__container">
            `;
                
            template = template + (isAdminPage ? `
                            <h2>공지사항 글 관리</h2>
            ` : `
                            <h2>공지사항 게시판</h2>
            `);
            
            template = template + `${list}`;

            template = template + (isAdminPage ?  `
                            <a class="link__1" href="/admin">돌아가기</a>
            ` : `
                            <a class="link__1" href="/board">돌아가기</a>
            `);
                    
            template = template + (isAdminPage ?  `
                            <a class="link__2" href="/admin/notice">공지사항 작성하기</a>
            ` : `
                    
            `);

            template = template +`
                        </div>
                        <div class="pages__container">
                            ${ptemplate}
                        </div>
                    </div>
                    <script src="/views/src/scripts/clock.js"></script>
                    <script src="/views/src/scripts/index.js"></script>

                </body>
                </html>
            `;

        return template;
    },

    c_noticeList: function (data, pageNum, isAdminPage) {
        // /admin/post/manage/:num
        var list = '<ul>\
                        <li>\
                            <div class="link__container">\
                                <div class="board__link">\
                                    <div class="date">날짜</div>\
                                    <div class="title">제목</div>\
                                </div>\
                            </div>\
                        </li>';
        var i = 0;
        while (i<data.length) {
            let date = `${data[i].cdate.substring(5,7) + '/' + data[i].cdate.substring(8,10)} (${data[i].cdate.substring(11,12)})`;
            list = list + (isAdminPage ? `
                <li>
                    <div class="link__container">
                        <a class="board__link" href="/admin/post/${data[i].id}/update?pageNum=${pageNum}">
                            <div class="date">${date}</div>
                            <div class="title">${data[i].title}</div>
                        </a>
                    </div>
                    <form class="del__container" action="/admin/post/${data[i].id}/dprocess?_method=DELETE" method="post">
                        <input type="hidden" name="pageNum" value="${pageNum}">
                        <input class="del__btn" type="submit" value="삭제">
                    </form>
                </li>
            ` : `
                <li>
                    <div class="link__container">
                        <a class="board__link" href="/board/${data[i].id}?pageNum=${pageNum}">
                            <div class="date">${date}</div>
                            <div class="title">${data[i].title}</div>
                        </a>
                    </div>
                </li>
            `);
              i = i + 1;
        }
        list = list + '</ul>';

        return list;
    },

    c_alert: function(contents, location){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
        <link rel="stylesheet" href="/views/src/styles/adminPages.css">
        <script src="/views/src/scripts/fetchJson.js"></script>
        </head>
        <body>
            <script>
                alert("${contents}");
                document.location.href="${location}";
            </script>
        </body>
        </html>
        `
    },

    a_edit: function (id, title, contents, pageNum) {
        // /admin/post/:noticeNum
        return `

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>공지사항 수정</title>
            <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
            <link rel="stylesheet" href="/views/src/styles/adminPages.css">
            <script src="/views/src/scripts/fetchJson.js"></script>
        
            <link rel="stylesheet" href="/views/src/styles/template/admin-post-num.css">
        </head>
        <body>
            <div class="container">
                <div class="clock__container"></div>
        
                <div class="title__container">
                    <span class="title"></span>
                </div>
        
                <div class="inner__container">
                    <h2>공지사항 수정</h2>
                    <form action ="/admin/notice/${id}/uprocess?_method=patch" method="post"> 
                        <input type="hidden" name="pageNum" value="${pageNum}">
                        <input class="input__1" name="title" type="text" value="${title}">
                        <textarea class="input__2" name="contents">${contents}</textarea>
                        <input class="input__3" type="submit" value="수정">
                        <a class="link__1" href="/admin/notice/manage/${pageNum}">돌아가기</a>
                    </form>
                </div>
            </div>
        
            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
        </body>
        </html>
        `
    },

    a_checkList: function(datalist){
        // /admin/slide
        var list = `<div class="checkbox__container">`;
        console.log(datalist);
        var i = 0;
        while (i < datalist.length) {
            list = list +  `<div class="check-box__items">
                                <input class="check-box" type="checkbox" id="check${datalist[i]}"name="check${datalist[i]}" value="${datalist[i]}" onchange="checkBox(this)">
                                <label for="check${datalist[i]}">
                                    <img class="check__svg" src="/views/src/images/check.svg" />
                                </label>
                                <strong>${datalist[i]}</strong>
                            </div>`;
            i = i + 1;
        }
        list = list + '</div>';
        return list;
    },
    
    a_slide: function (list){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>슬라이드 관리</title>
            <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
            <link rel="stylesheet" href="/views/src/styles/adminPages.css">
            <script src="/views/src/scripts/fetchJson.js"></script>
        
            <link rel="stylesheet" href="/views/src/styles/template/admin-slide.css">
        </head>
        <body>
            <div class="container">
                <div class="clock__container"></div>
        
                <div class="title__container">
                    <span class="title"></span>
                </div>
        
                <div class="outter__container">
                    <h2>슬라이드 관리</h2>
                    
                    <form action="/admin/slide" method="post">
                        <div class="inner-container">
                            <div class="inner-container__1">
                                <div class="inner-title__1">슬라이드 순서</div>
                                ${list}
                                <input class="result-box" type="text" name="checkResult" id="checkResult" readonly>
                            </div>
                            <div class="inner-container__2">
                                <div class="inner-title__2">슬라이드 순환 시간</div>
                                <div class="time-input__container">
                                    <input class="time-input" name="title" type="text" placeholder="H">
                                    <div class="time-text">시간</div>
                                    <input class="time-input" name="title" type="text" placeholder="M">
                                    <div class="time-text">분</div>
                                    <input class="time-input" name="title" type="text" placeholder="S">
                                    <div class="time-text">초</div>
                                </div>
                            </div>
                        </div>
                        <input class="confirm-btn" type="submit" value="확인">
                    </form>
                    <a class="link__1" href="/admin">돌아가기</a>  


                </div>
            </div>
        
            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
            <script>

            function checkBox(checked){
                var result = document.getElementById("checkResult");
                if( checked.checked==true ){
                    console.log(result.value);
                    if(result.value == "" ){
                        result.value = checked.getAttribute("value");
                    }else{
                        result.value += ","+ checked.getAttribute("value");
                    }
                }else {
            
                    var resultArr = result.value.split(",");
                    for(var i=0; i<resultArr.length; i++){
                        if(resultArr[i] == checked.getAttribute("value")){
                            resultArr.splice(i,1);
                            break;
                        }
                    }
                    result.value  = resultArr.join(",");
            
                }
             }
            </script>
        </body>
        </html>


        `
    },

    a_workerList: function (name, data) {
        var list = `<select name="${name}">
        <option value="" disabled selected>직원선택</option>`;
        var i = 0;
        while (i < data.length) {
            list = list + `<option value="${data[i]}">${data[i].split('.')[0]}</option>`;
            i = i + 1;
        }
        list = list + '</select>';

        return list;
    },

    a_workerManage: function (dStaff, leader, staff1, staff2, staff3) {
        return `
        <!doctype html>
        <html>
        <head>
            <title> worker </title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,  initial-scale=1.0">
            <title>관리자 설정 페이지 - 근무자 현황 관리</title>
            <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
            <link rel="stylesheet" href="/views/src/styles/adminPages.css">
            <link rel="stylesheet" href="/views/src/styles/jquery-ui.css" type="text/css" />
            <script src="/views/src/scripts/jquery.min.js"></script>
            <style>
            p{
                margin: 0;
            }
            :root{
                --width: 1920px;
            }
            .container{
                background-image: url('/views/src/images/background_nonews.png');
            }
            .inner__container{
                position: absolute;
                width: calc(var(--width) / 100 * 61.4);
                height: calc(var(--width) / 100 * 38.1);
                top: calc(var(--width) / 100 * 9.5);
                left: calc(var(--width) / 100 * 19.2);
            }
            .add__container, .delete__container, .select__container {
                position: absolute;
                padding: calc(var(--width) / 100 * 0.5) calc(var(--width) / 100 * 1);
                border-radius: calc(var(--width) / 100 * 0.5);
                border: calc(var(--width) / 100 * 0.12) solid darkslategrey;
            }
            .add__container{
                width: calc(var(--width) / 100 * 33);
                height: calc(var(--width) / 100 * 19.7);
                top: calc(var(--width) / 100 * 5);
                left: calc(var(--width) / 100 * 2.5);
            }
            .delete__container{
                width: calc(var(--width) / 100 * 33);
                height: calc(var(--width) / 100 * 6);
                top: calc(var(--width) / 100 * 26.7);
                left: calc(var(--width) / 100 * 2.5);
            }
            .select__container{
                width: calc(var(--width) / 100 * 18);
                height: calc(var(--width) / 100 * 27.7);
                top: calc(var(--width) / 100 * 5);
                left: calc(var(--width) / 100 * 38.2);
            }
            .form__title{
                width: 100%;
                text-align: center;
                font-size: calc(var(--width) / 100 * 1.8);
                font-weight: bold;
            }
            .input__1, .input__2, .input__3, select{
                position: absolute;
                background-color: #222222;
                
                width: calc(var(--width) / 100 * 15);
                height: calc(var(--width) / 100 * 2.5);
                left: 50%;
                transform: translateX(-50%);
                border-radius: calc(var(--width) / 100 * 0.7);
    
                color: white;
    
                font-size: calc(var(--width) / 100 * 1.4);
                font-weight: 600;
    
                padding: 0 calc(var(--width) / 100 * 1);
            }
            .input__1{
                top: calc(var(--width) / 100 * 3.5);
            }
            .input__2{
                top: calc(var(--width) / 100 * 7);
            }
            .input__3{
                top: calc(var(--width) / 100 * 10.5);
            }
            select {
                width: calc(var(--width) / 100 * 17);
                color: white;
            }
            option:first-of-type {
                color: grey;
            }
            .delete__container select {
                top: calc(var(--width) / 100 * 3.5);
            }
            .select__container select {
                position: relative;
                margin-top: calc(var(--width) / 100 * 0.6);
            }
            .leader, .staff1, .staff2, .staff3{
                font-size: calc(var(--width) / 100 * 1.2);
                font-weight: bold;
                margin-top: calc(var(--width) / 100 * 0.6);
            }
            .input__4 label, .input__5, .input__6, .input__7{
                position: absolute;
                width: calc(var(--width) / 100 * 6.3);
                height: calc(var(--width) / 100 * 2.5);
                border-radius: calc(var(--width) / 100 * 0.7);
                font-size: calc(var(--width) / 100 * 1.3);
                background-color: #D8D8D8;
                opacity: 1;
                font-weight: 600;
                transition: 0.1s;
                cursor: pointer;
            }
            .input__4 label {
                top: calc(var(--width) / 100 * 14);
                left: calc(var(--width) / 100 * 1.4);
                border: calc(var(--width) / 100 * 0.12) solid darkslategrey;
                text-align: center;
                line-height: calc(var(--width) / 100 * 2.5);
            }                
            .input__4 input[type="file"] {
                position: absolute; 
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip:rect(0,0,0,0);
                border: 0; 
            }
            .input__4 .upload-name {
                position: absolute;
                display: inline-block;
                width: calc(var(--width) / 100 * 22.5);
                top: calc(var(--width) / 100 * 14);
                left: calc(var(--width) / 100 * 9);
                padding: calc(var(--width) / 100 * 0.6) calc(var(--width) / 100 * 0.8);
                font-size: inherit;
                font-family: inherit; 
                line-height: normal; vertical-align: middle; 
                background-color: #f5f5f5; 
                border: 1px solid #ebebeb; 
                border-bottom-color: #e2e2e2; 
                border-radius: calc(var(--width) / 100 * 0.7);
                -webkit-appearance: none; /* 네이티브 외형 감추기 */ 
                -moz-appearance: none;
                appearance: none; 
            }
            .input__5{
                top: calc(var(--width) / 100 * 17.5);
                left: calc(var(--width) / 100 * 27.4);
            }
            .input__6{
                top: calc(var(--width) / 100 * 3.5);
                left: calc(var(--width) / 100 * 27.4);
            }
            .input__7{
                top: calc(var(--width) / 100 * 25.5);
                left: calc(var(--width) / 100 * 12.5);
            }
            .input__4 label:hover, .input__5:hover{
                background-color: #A4A4A4;
            }
            h2{
                position: absolute;
                top: calc(var(--width) / 100 * 8.7);
                left: calc(var(--width) / 100 * 21.1);
                font-size: calc(var(--width) / 100 * 2.3);
                font-weight: 600;
            }
            .link__1{
                position: absolute;
                font-size: calc(var(--width) / 100 * 1.4);
    
                color: black;
                font-weight: 600;
                opacity: 0.8;
                transition: 0.1s;
                text-decoration: none;
    
                top: calc(var(--width) / 100 * 34.35);
                left: calc(var(--width) / 100 * 2);
            }
            .link__1:hover{
                opacity: 1;
                text-decoration: underline;
            }
            </style>
        </head>
        <body>
        <div class="container">
        <div class="clock__container"></div>

        <div class="title__container">
            <span class="title"></span>
        </div>

        <h2>관리자 설정 페이지 - 근무자 현황 관리</h2>

        <div class="inner__container">
            <div class="add__container">
                <p class="form__title">근무자 추가</p>
                <form action="/admin/worker/upload" method="post" enctype="multipart/form-data">
                    <input class="input__1" type="text" name="dep" placeholder="부서">
                    <input class="input__2" type="text" name="rank" placeholder="직급">
                    <input class="input__3" type="text" name="name" placeholder="이름">
                        <div class="input__4">
                            <input class="upload-name" value="파일선택" readonly="readonly">
                            <label for="ex_filename">사진첨부</label>
                            <input id="ex_filename" class="upload-hidden" type="file" name="userfile">
                        </div>
                        <input class="input__5" type="submit" value="추가"></p>
                </form>
            </div>
            <div class="delete__container">
                <p class="form__title">근무자 삭제</p>
                <form action="/admin/worker/delete?_method=DELETE" method="post"">
                    <p>${dStaff}</p>
                    <input class="input__6" type="submit" value="삭제">
                 </form>
            </div>
            <div class="select__container">
                <p class="form__title">근무자 현황</p>
                <form action="/admin/worker" method="post">
                    <p class="leader">책임자</p>
                    <p>${leader}</p>
                    <p class="staff1">사원1</p>
                    <p>${staff1}</p>
                    <p class="staff2">사원2</p>
                    <p>${staff2}</p>
                    <p class="staff3">사원3</p>
                    <p>${staff3}</p>
                    <p><input class="input__7" type="submit" value="적용"><p>
                </form>
            </div>
            <p><a class="link__1" href="/admin">돌아가기</a></p>
        </div>
        
        <script src="/views/src/scripts/clock.js"></script> 
        <script src="/views/src/scripts/index.js"></script>
        <script>
        $(document).ready(function(){
            let fileTarget = $('.upload-hidden');
            let fileName = $('.upload-name');

            fileName.val('사진을 첨부해주세요.');
            fileTarget.change(function(){
                let path = $(this).val();
                fileName.val(path);
            });
        });
        </script>
        </body>
        </html>
        `
    },

}

