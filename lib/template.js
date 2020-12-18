const util = require('../middleware/util');

module.exports = {
    notice: function (title, contents, cdate) {
        return `
        <!doctype html>
        <html>
        <head>
        <title> Notice </title>
        <meta charset="utf-8">
        </head>
        <body>
        <h2>${title}</h2>
        <p>${cdate}</p>
        <P>${contents}</p>
        <p><a href="/board">돌아가기</a></p>
        </body>
        </html>
        `
    },

    noticeList: function (datalist) {
        var list = '<ul>';
        var i = 0;
        while (i < datalist.length) {
            var cdate = util.cdateParser(datalist[i].cdate);
            list = list + `<li>${cdate.date} ${cdate.week} <a href="/board/${datalist[i].id}">${datalist[i].title}</a></li>`;
            i = i + 1;

        }
        list = list + '</ul>';

        return list;
    },
    board: function (list) {
        return `
        <!doctype html>
        <html>
        <head>
            <title> Notice </title>
            <meta charset="utf-8">
        </head>
        <body>
        <h2>공지사항 게시판</h2>
            ${list}
        <a href="/auth/login">관리자 설정</a>
        </body>
        </html>
        `
    },

    m_board: function (list) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>관리자 설정 페이지 - 공지 작성</title>
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
                
                .board__form{
                    flex: 1;
                    text-align: center;
                }

                .delete__btn{
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
                .delete__btn:hover{
                    background-color: #B40202;
                }

                li:nth-child(1){
                    text-align:center;
                    font-weight: 600;
                    border-top: none;
                    opacity: 1;
                }
                .title{
                    opacity: 1 !important;
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
                    <h2>공지사항 글 관리</h2>
                    ${list}
                    <a class="link__1" href="/admin">돌아가기</a>
                </div>
            </div>
        
            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
        </body>
        </html>


        `
    },

    m_noticeList: function (datalist) {

        var list = '<ul><li><div class="board__link title">제목</div><div class="board__form">삭제</div></li>';
        var i = 0;
        while (i < datalist.length) {
            list = list + `<li><div class="link__container"><a class="board__link" href="/admin/post/${datalist[i].id}/update">${datalist[i].title}</a></div>
              <form class="board__form" action="/admin/post/${datalist[i].id}/dprocess?_method=DELETE" method="post">
                  <input class="delete__btn" type="submit" value="삭제">
                 </form></li>`;
            i = i + 1;

        }
        list = list + '</ul>';

        return list;
    },

    m_edit: function (_id, _title, _contents) {
        return `
        <!doctype html>
        <html>
        <head>
          <title> Edit </title>
          <meta charset="utf-8">
        </head>
        <body>
        <form action ="/admin/post/${_id}/uprocess?_method=patch" method="post"> 
        
        
          <h2>${_title}</h2>
          <p><textarea name="contents">${_contents}</textarea></p>
          <p><input type="submit" value="수정"></p>
        </form>
        <a href="/admin/post/manage">돌아가기</a>
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