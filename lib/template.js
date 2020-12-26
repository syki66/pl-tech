const util = require('../middleware/util');

module.exports = {
    notice: function (title, contents, cdate, page="") {
        // /board/:num
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
                    <a class="link__1" href="/board${page}">돌아가기</a>
                </div>
            </div>
        
            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
        </body>
        </html>


        `
    },

    noticeList: function (datalist) {
        // /board
        var list = `<ul>
                        <li>
                            <div class="date__container">날짜</div>
                            <div class="link__container title">제목</div>
                        </li>`;
        var i = 0;
        while (i < datalist.length) {
            var cdate = util.cdateParser(datalist[i].cdate);
            list = list + `<li>
                                <div class="date__container">${cdate.date} (${cdate.week})</div>
                                <div class="link__container">
                                    <a class="board__link" href="/board/${datalist[i].id}">${datalist[i].title}</a>
                                </div>
                        </li>`;
            i = i + 1;

        }
        list = list + '</ul>';

        return list;
    },
    board: function (list) {
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
                    <a class="link__1" href="/auth/login">관리자 설정</a>
                    <a class="link__2" href="/board/more/1">공지사항 더보기</a>
                </div>
            </div>            

            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
        </body>
        </html>
        `
    },

    pageBar: function (pages) {
        // /admin/post/manage/:num
        // /board/more/:num
        var pagebar = ``;
        var i = 0;
        while (i < pages) {
            pagebar = pagebar + `<a class="nav" href="${i + 1}">[${i + 1}]</a>`;
            i = i + 1;
        }
        pagebar = `<div class="nav__container">${pagebar}</div>`
        return pagebar;
    },

    m_board: function (list, ptemplate, isAdminPage) {
        // /admin/post/manage/:num
        // /board/more/:num
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
                            <a class="link__2" href="/admin/post">공지사항 작성하기</a>
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

    m_noticeList: function (datalist, pagenum, isAdminPage) {
        // /admin/post/manage/:num
        var list = '<ul><li><div class="link__container">제목</div></li>';
        var i = 0;
        while (i<datalist.length) {
            list = list + (isAdminPage ? `
                <li>
                    <div class="link__container">
                        <a class="board__link" href="/admin/post/${datalist[i].id}/update?pagenum=${pagenum}">${datalist[i].title}</a>
                    </div>
                    <form class="del__container" action="/admin/post/${datalist[i].id}/dprocess?_method=DELETE" method="post">
                        <input type="hidden" name="pagenum" value="${pagenum}">
                        <input class="del__btn" type="submit" value="삭제">
                    </form>
                </li>
            ` : `
                <li>
                    <div class="link__container">
                        <a class="board__link" href="/board/${datalist[i].id}?pagenum=${pagenum}">${datalist[i].title}</a>
                    </div>
                </li>
            `);
              i = i + 1;
        }
        list = list + '</ul>';

        return list;
    },

    m_edit: function (id, title, contents, pagenum) {
        // /admin/post/:num
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
                    <form action ="/admin/post/${id}/uprocess?_method=patch" method="post"> 
                        <input type="hidden" name="pagenum" value="${pagenum}">
                        <input class="input__1" name="title" type="text" value="${title}">
                        <textarea class="input__2" name="contents">${contents}</textarea>
                        <input class="input__3" type="submit" value="수정">
                        <a class="link__1" href="/admin/post/manage/${pagenum}">돌아가기</a>
                    </form>
                </div>
            </div>
        
            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
        </body>
        </html>
        `
    },

    m_checkList: function(datalist){
        // /admin/slide
        var list = `<div class="checkbox__container">`;
        console.log(datalist);
        var i = 0;
        while (i < datalist.length) {
            list = list +  `<div class="checkboxes">
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
    
    m_slide: function (list){
        // /admin/slide
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
        
                <div class="inner__container">
                    <h2>슬라이드 관리</h2>
                    
                    <form action="/admin/slide" method="post">
                        <div class="inner-container__1">
                            <div class="inner-title__1">- 슬라이드 순서</div>
                            ${list}
                            <input class="result-box" type="text" name="checkResult" id="checkResult" readonly>
                        </div>
                        <div class="inner-container__2">
                            <div class="inner-title__2">- 슬라이드 순환 시간</div>
                            <div class="time-input__container">
                                <input class="time-input" name="title" type="text" placeholder="H">
                                <div class="time-text">시간</div>
                                <input class="time-input" name="title" type="text" placeholder="M">
                                <div class="time-text">분</div>
                                <input class="time-input" name="title" type="text" placeholder="S">
                                <div class="time-text">초</div>
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
    m_workerList: function (name, datalist) {
        var list = `<select name="${name}">
        <option value="">직원선택</option>`;
        var i = 0;
        while (i < datalist.length) {
            list = list + `<option value="${datalist[i]}">${datalist[i].split('.')[0]}</option>`;
            i = i + 1;
        }
        list = list + '</select>';

        return list;
    },

    m_workerManage: function (leader, staff1, staff2, staff3) {
        return `
        <!doctype html>
        <html>
        <head>
            <title> wboardManage </title>
            <meta charset="utf-8">
        </head>
        <body>
        <h2>근무자 현황 관리</h2>
        <form action="/admin/wmanage/upload" method="post" enctype="multipart/form-data">
            <input type="text" name="dep" placeholder="부서">
            <input type="text" name="rank" placeholder="직급">
            <input type="text" name="name" placeholder="이름">
            <p><input type="file" name="userfile">
            <input type="submit" value="업로드"></p>
        </form>
        <form action="/admin/wmanage" method="post">
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

    alert: function(contents, location){
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
    }

}

