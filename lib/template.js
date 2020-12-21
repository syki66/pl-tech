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
                    background-image: url('/views/src/images/background.png');
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
                }
                .link__1:hover{
                    opacity: 1;
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
                    background-image: url('/views/src/images/background.png');
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
                    padding-top: calc(var(--width) / 100 * 0.7);
                    padding-bottom: calc(var(--width) / 100 * 0.7);
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
                    white-space: normal;
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
        
                    top: calc(var(--width) / 100 * 43.7);
                }
                .link__2{
                    left: calc(var(--width) / 100 * 47.5);
                }
                .link__1:hover, .link__2:hover{
                    opacity: 1;
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

    ptmpl: function (pages) {
        // /admin/post/manage/:num
        var ptmpl = ``;
       var i = 0;
       while(i<pages){
           ptmpl = ptmpl + `<a href="${i+1}">[${i+1}]</a>&nbsp;&nbsp;`;
           i = i+1;
       }

       return ptmpl;
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
                            background-image: url('/views/src/images/background.png');
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
                            padding-top: calc(var(--width) / 100 * 0.7);
                            padding-bottom: calc(var(--width) / 100 * 0.7);
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
                            white-space: normal;
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
                            font-size: font-size: calc(var(--width) / 100 * 1.8);
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
                        }
                        .link__2{
                            left: calc(var(--width) / 100 * 46.2);
                        }
                        .link__1:hover, .link__2:hover{
                            opacity: 1;
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





    m_edit: function (_id, _title, _contents, page) {
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
                    background-image: url('/views/src/images/background.png');
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
                }
                .link__1:hover{
                    opacity: 1;
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
                    <form action ="/admin/post/${_id}/uprocess?_method=patch" method="post"> 
                        <input type="hidden" name="page" value="${page}">
                        <input class="input__1" name="title" type="text" value="${_title}">
                        <textarea class="input__2" name="contents">${_contents}</textarea>
                        <input class="input__3" type="submit" value="수정">
                        <a class="link__1" href="/admin/post/manage/${page}">돌아가기</a>
                    </form>
                </div>
            </div>
        
            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
        </body>
        </html>

        `
    },
    
    m_workerList: function (name, datalist) {
        var list = `<select name="${name}">
        <option value="">직원선택</option>`;
        var i = 0;
        while (i < datalist.length) {
            list = list + `<option value="${datalist[i]}">${datalist[i]}</option>`;
            i = i + 1;
        }
        list = list + '</select>';

        return list;
    },

    m_wboardManage: function (leader, staff1, staff2, staff3) {
        return `
        <!doctype html>
        <html>
        <head>
            <title> wboardManage </title>
            <meta charset="utf-8">
        </head>
        <body>
        <h2>근무자 현황 관리</h2>
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