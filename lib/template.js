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
        <option value="">직원선택</option>`;
        var i = 0;
        while (i < data.length) {
            list = list + `<option value="${data[i]}">${data[i].split('.')[0]}</option>`;
            i = i + 1;
        }
        list = list + '</select>';

        return list;
    },

    a_worker: function (leader, staff1, staff2, staff3) {
        return `
        <!doctype html>
        <html>
        <head>
            <title> wboardManage </title>
            <meta charset="utf-8">
        </head>
        <body>
        <h2>근무자 현황 관리</h2>
        <form action="/admin/worker/upload" method="post" enctype="multipart/form-data">
            <input type="text" name="dep" placeholder="부서">
            <input type="text" name="rank" placeholder="직급">
            <input type="text" name="name" placeholder="이름">
            <p><input type="file" name="userfile">
            <input type="submit" value="업로드"></p>
        </form>
        <form action="/admin/worker" method="post">
        <p>책임자</p>
        <p>${leader}</p>
        <p>사원1</p>
        <p>${staff1}</p>
        <p>사원2</p>
        <p>${staff2}</p>
        <p>사원3</p>
        <p>${staff3}</p>
        <p><input type="submit" value="적용"><p>
        </form>
        <a href="/admin">돌아가기</a>  
        </body>
        </html>
        `
    },

}

