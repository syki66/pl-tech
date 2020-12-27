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
        
            <style>
                :root{
                    --width: 1920px;
                }
                .container{
                    background-image: url('/views/src/images/background_nonews.png');
                }
                .inner__container{
                    position: relative;
                    left: calc(var(--width) / 100 * 21.1);
                }
                h2{
                    position: absolute;
                    top: calc(var(--width) / 100 * 8.7);
                    font-size: calc(var(--width) / 100 * 2.3);
                    font-weight: 600;
                    width: calc(var(--width) / 100 * 45);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }

                .content{
                    position: absolute;
                    margin: 0vw;
                    width: calc(var(--width) / 100 * 55.65);
                    height: calc(var(--width) / 100 * 24.7);
                    top: calc(var(--width) / 100 * 14.80);

                    padding: calc(var(--width) / 100 * 1);

                    background-color: #222222;
                    border: calc(var(--width) / 100 * 0.12) solid #767676;
                    border-radius: calc(var(--width) / 100 * 0.7);
                    font-size: calc(var(--width) / 100 * 1.8);
                    color: white;

                    overflow: auto;
                }

                .cdate{
                    position: absolute;
                    top: calc(var(--width) / 100 * 12.1);
                    left: calc(var(--width) / 100 * 47);
                    font-size: calc(var(--width) / 100 * 1);
                    font-weight: 600;
                }
                
                .link__1{
                    position: absolute;
                    font-size: calc(var(--width) / 100 * 1.4);
        
                    color: black;
                    font-weight: 600;
                    opacity: 0.8;
                    transition: 0.1s;
        
                    top: calc(var(--width) / 100 * 43.7);

                    text-decoration: none;
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
        
            <style>
                :root{
                    --width: 1920px;
                }
                .container{
                    background-image: url('/views/src/images/background_nonews.png');
                }
                .inner__container{
                    position: relative;
                    left: calc(var(--width) / 100 * 21.1);
                }
                h2{
                    position: absolute;
                    top: calc(var(--width) / 100 * 8.7);
                    font-size: calc(var(--width) / 100 * 2.3);
                    font-weight: 600;
                }

                ul{
                    position: absolute;
                    margin: 0vw;
                    width: calc(var(--width) / 100 * 55.65);
                    height: calc(var(--width) / 100 * 26.7);
                    top: calc(var(--width) / 100 * 14.80);

                    padding: 0 calc(var(--width) / 100 * 1) 0 calc(var(--width) / 100 * 1);

                    display:flex;
                    flex-direction:column;

                    background-color: #222222;
                    border: calc(var(--width) / 100 * 0.12) solid #767676;
                    border-radius: calc(var(--width) / 100 * 0.7);
                    font-size: calc(var(--width) / 100 * 1.8);
                    color: white;
                }
                li{
                    display: flex;
                    padding: calc(var(--width) / 100 * 0.65) 0vw;
                    border-top: calc(var(--width) / 100 * 0.05) solid rgba(118, 118, 118, 0.5);
                    
                }

                .link__container{
                    flex: 8;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    margin-left: calc(var(--width) / 100 * 2);
                }
                .board__link{
                    color: white;
                    text-decoration:none;
                    flex: 10;
                    opacity: 1;
                }
                .board__link:hover{
                    opacity: 0.8;
                }
                
                .date__container{
                    flex: 2;
                    text-align: center;
                }

                li:nth-child(1){
                    text-align:center;
                    font-weight: 600;
                    border-top: none;
                    opacity: 1;
                }
                .link__1, .link__2{
                    position: absolute;
                    font-size: calc(var(--width) / 100 * 1.4);
        
                    color: black;
                    font-weight: 600;
                    opacity: 0.8;
                    transition: 0.1s;
                    text-decoration: none;
        
                    top: calc(var(--width) / 100 * 43.7);
                }
                .link__2{
                    left: calc(var(--width) / 100 * 47.5);
                }
                .link__1:hover, .link__2:hover{
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
                
                    <style>
                        :root{
                            --width: 1920px;
                        }
                        .container{
                            background-image: url('/views/src/images/background_nonews.png');
                        }
                        .inner__container{
                            position: relative;
                            left: calc(var(--width) / 100 * 21.1);
                        }
                        h2{
                            position: absolute;
                            top: calc(var(--width) / 100 * 8.7);
                            font-size: calc(var(--width) / 100 * 2.3);
                            font-weight: 600;
                        }
                        ul{
                            position: absolute;
                            margin: 0vw;
                            width: calc(var(--width) / 100 * 55.65);
                            height: calc(var(--width) / 100 * 26.7);
                            top: calc(var(--width) / 100 * 14.80);
                            padding: 0 calc(var(--width) / 100 * 1) 0 calc(var(--width) / 100 * 1);
                            display:flex;
                            flex-direction:column;
                            background-color: #222222;
                            border: calc(var(--width) / 100 * 0.12) solid #767676;
                            border-radius: calc(var(--width) / 100 * 0.7);
                            font-size: calc(var(--width) / 100 * 1.8);
                            color: white;
                        }
                        li{
                            display: flex;
                            padding: calc(var(--width) / 100 * 0.65) 0vw;
                            border-top: calc(var(--width) / 100 * 0.05) solid rgba(118, 118, 118, 0.5);
                            
                        }
                        .link__container{
                            flex: 10;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            margin: 0vw calc(var(--width) / 100 * 1.4);
                        }
                        .board__link{
                            color: white;
                            text-decoration:none;
                            opacity: 1;
                        }
                        .board__link:hover{
                            opacity: 0.8;
                        }
                        
                        .del__container{
                            flex: 1;
                            text-align: center;
                            margin: 0vw calc(var(--width) / 100 * 1.4);
                        }
                        .del__btn{
                            height: 100%;
                            width: 100%;
                            font-size: calc(var(--width) / 100 * 1.7);
                            border-radius: calc(var(--width) / 100 * 0.7);
                            background-color: #DA0202;
                            opacity: 1;
                            font-weight: 600;
                            transition: 0.1s;
                            cursor: pointer;
                            border: none;
                        }
                        .del__btn:hover{
                            background-color: #B40202;
                        }
                        li:nth-child(1){
                            text-align:center;
                            font-weight: 600;
                            border-top: none;
                            opacity: 1;
                        }
                        .link__1, .link__2{
                            position: absolute;
                            font-size: calc(var(--width) / 100 * 1.4);
                
                            color: black;
                            font-weight: 600;
                            opacity: 0.8;
                            transition: 0.1s;
                
                            top: calc(var(--width) / 100 * 43.7);

                            z-index: 1;
                            text-decoration: none;
                        }
                        .link__2{
                            left: calc(var(--width) / 100 * 46.2);
                        }
                        .link__1:hover, .link__2:hover{
                            opacity: 1;
                            text-decoration: underline;
                        }

                        .nav__container{
                            position: absolute;
                            width: var(--width);
                            text-align: center;
                            top: calc(var(--width) / 100 * 43.6);
                            
                            z-index: 0;
                        }
                        .nav{
                            color: black;
                            font-size: calc(var(--width) / 100 * 1.4);
                            margin: calc(var(--width) / 100 * 0.5);
                            text-decoration:none;
                            font-weight: 900;
                            opacity: 0.7;
                            
                            transition: 0.1s;
                        }
                        .nav:hover{
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
        
            <style>                
                :root{
                    --width: 1920px;
                }
                .container{
                    background-image: url('/views/src/images/background_nonews.png');
                }
                .inner__container{
                    position: relative;
                    left: calc(var(--width) / 100 * 21.1);
                }
                h2{
                    position: absolute;
                    top: calc(var(--width) / 100 * 8.7);
                    font-size: calc(var(--width) / 100 * 2.3);
                    font-weight: 600;
                }
                .input__1, .input__2{
                    position: absolute;
                    background-color: #222222;
                    
                    width: calc(var(--width) / 100 * 55.7);
                    
                    border-radius: calc(var(--width) / 100 * 0.7);
        
                    color: white;
        
                    font-size: calc(var(--width) / 100 * 1.8);
                    font-weight: 600;
        
                    padding: 0vw calc(var(--width) / 100 * 1);
                }
                .input__1{
                    top: calc(var(--width) / 100 * 14.8);
                    height: calc(var(--width) / 100 * 3.5);
                }
                .input__2{
                    top: calc(var(--width) / 100 * 20.1);
                    height: calc(var(--width) / 100 * 19.5);
                    padding: calc(var(--width) / 100 * 1);
                }
                
                .input__3{
                    position: absolute;
                    top: calc(var(--width) / 100 * 43);
                    left: calc(var(--width) / 100 * 51.5);
                    width: calc(var(--width) / 100 * 6.3);
                    height: calc(var(--width) / 100 * 3.2);
                    border-radius: calc(var(--width) / 100 * 0.7);;
                    font-size: calc(var(--width) / 100 * 1.3);
                    background-color: #D8D8D8;
                    opacity: 1;
                    font-weight: 600;
                    transition: 0.1s;
                    cursor: pointer;
                }
                .input__3:hover{
                    background-color: #A4A4A4;
                }
                .link__1{
                    position: absolute;
                    font-size: calc(var(--width) / 100 * 1.4);
        
                    color: black;
                    font-weight: 600;
                    opacity: 0.8;
                    transition: 0.1s;
        
                    top: calc(var(--width) / 100 * 43.7);
                    text-decoration: none;
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
        var list = `<p>`;
        console.log(datalist);
        var i = 0;
        while (i < datalist.length) {
            list = list + `<input type="checkbox" id="check${datalist[i]}"name="check${datalist[i]}" value="${datalist[i]}" onchange="checkBox(this)">${datalist[i]}&nbsp;&nbsp;&nbsp;`;
            i = i + 1;
        }
        list = list + '<p>';
        return list;
    },
    
    m_slide: function (list){
        return `
        <!doctype html>
        <html>
        <head>
            <title> 슬라이드 관리 </title>
            <meta charset="utf-8">
        </head>
        <body>
        <h2>슬라이드 관리</h2>
        <form action="/admin/slide" method="post">
        ${list}
        <input type="text" name="checkResult" id="checkResult" readonly>
        <input type="submit" value="확인"> 
        </form>
        <a href="/admin">돌아가기</a>  
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
        <option value="" disabled selected>직원선택</option>`;
        var i = 0;
        while (i < datalist.length) {
            list = list + `<option value="${datalist[i]}">${datalist[i].split('.')[0]}</option>`;
            i = i + 1;
        }
        list = list + '</select>';

        return list;
    },

    m_workerManage: function (dStaff, leader, staff1, staff2, staff3) {
        return `
        <!doctype html>
        <html>
        <head>
            <title> wboardManage </title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,  initial-scale=1.0">
            <title>관리자 설정 페이지 - 근무자 현황 관리</title>
            <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
            <link rel="stylesheet" href="/views/src/styles/adminPages.css">
            <link rel="stylesheet" href="/views/src/styles/jquery-ui.css" type="text/css" />
            <script src="/views/src/scripts/jquery.min.js"></script>
            <style>
            p{
                margin: 0vw;
            }
            
            :root{
                --width: 1920px;
            }
            .container{
                background-image: url('/views/src/images/background_nonews.png');
            }
            .inner__container{
                position: absolute;
                width: 61.4vw;
                height: 38.1vw;
                top: 9.5vw;
                left: 19.2vw;
                border: 1px solid blue;
            }
            .add__container, .delete__container, .select__container {
                position: absolute;
                padding: 1vw 1vw;
                border-radius: calc(var(--width) / 100 * 0.5);
                border: 2px solid darkslategrey;
            }
            .add__container{
                width: 33vw;
                height: 20vw;
                top: 5vw;
                left: 2.5vw;
            }

            .delete__container{
                width: 33vw;
                height: 6vw;
                top: 28vw;
                left: 2.5vw;
            }

            .select__container{
                width: 18vw;
                height: 29vw;
                top: 5vw;
                left: 38.5vw;
            }

            .form__title{
                width: 100%;
                text-align: center;
                font-size: 1.8vw;
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
    
                padding: 0vw calc(var(--width) / 100 * 1);
            }

            .input__1{
                top: calc(var(--width) / 100 * 4.5);
            }
            .input__2{
                top: calc(var(--width) / 100 * 8);
            }
            .input__3{
                top: calc(var(--width) / 100 * 11.5);
            }

            select {
                width: 17vw;
                color: white;
            }

            option:first-of-type {
                color: grey;
            }

            .delete__container select {
                top: 4.5vw;
            }

            .select__container select {
                position: relative;
                margin-top: 0.8vw;
            }

            .leader, .staff1, .staff2, .staff3{
                font-size: 1.2vw;
                font-weight: bold;
                margin-top: 0.8vw;
            }

            .input__4 label, .input__5, .input__6, .input__7{
                position: absolute;
                width: 6.3vw;
                height: 2.5vw;
                border-radius: 0.7vw;
                font-size: 1.3vw;
                background-color: #D8D8D8;
                opacity: 1;
                font-weight: 600;
                transition: 0.1s;
                cursor: pointer;
            }

            .input__4 label {
                top: 15vw;
                left: 1.4vw;
                border: 2px solid darkslategrey;
                text-align: center;
                line-height: 2.5vw;
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
                width: 23vw;
                top: 15vw;
                left: 9vw;
                padding: .5em .75em; /* label의 패딩값과 일치 */
                font-size: inherit;
                font-family: inherit; 
                line-height: normal; vertical-align: middle; 
                background-color: #f5f5f5; 
                border: 1px solid #ebebeb; 
                border-bottom-color: #e2e2e2; 
                border-radius: 0.7vw;
                -webkit-appearance: none; /* 네이티브 외형 감추기 */ 
                -moz-appearance: none;
                appearance: none; 
            }

            .input__5{
                top: 18.6vw;
                left: 27.4vw;
            }

            .input__6{
                top: 4.5vw;
                left: 27.4vw;
            }

            .input__7{
                top: 27.8vw;
                left: 12.5vw;
            }

            .input__4 label:hover, .input__5:hover{
                background-color: #A4A4A4;
            }

            h2{
                position: absolute;
                top: 8.7vw;
                left: 21.1vw;
                font-size: 2.3vw;
                font-weight: 600;
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
                <form action="/admin/wmanage/upload" method="post" enctype="multipart/form-data">
                    <input class="input__1" type="text" name="dep" placeholder="부서">
                    <input class="input__2" type="text" name="rank" placeholder="직급">
                    <input class="input__3" type="text" name="name" placeholder="이름">
                    <p>
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
                <form action="/admin/wmanage/delete?_method=DELETE" method="post"">
                    <p>${dStaff}</p>
                    <input class="input__6" type="submit" value="삭제">
                 </form>
            </div>
            <div class="select__container">
                <p class="form__title">근무자 현황</p>
                <form action="/admin/wmanage" method="post">
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

