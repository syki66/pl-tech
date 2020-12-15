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

    noticeList: function (filelist) {
        var list = '<ul>';
        var i = 0;
        while (i < filelist.length) {
            list = list + `<li><a href="/board/${filelist[i].id}">${filelist[i].title}</a></li>`;
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
                ul{
                    margin: 0vw;
                }
                
                :root{
                    --width: 1920px;
                }
                .container{
                    background-image: url('/views/src/images/admin.png');
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
                li:nth-child(1){
                    background: lightgreen;
                }
                li:nth-child(2){
                    background: aqua;
                }
                li:nth-child(3){
                    background: green;
                }
                li:nth-child(4){
                    background: pink;
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
                    <a href="/admin">돌아가기</a>
                </div>
            </div>
        
            <script src="/views/src/scripts/clock.js"></script>
            <script src="/views/src/scripts/index.js"></script>
        </body>
        </html>


        `
    },

    m_noticeList: function (datalist) {

        var list = '<ul>';
        var i = 0;
        while (i < datalist.length) {
            list = list + `<li><a href="/admin/post/${datalist[i].id}/update">${datalist[i].title}</a>
              <form action="/admin/post/${datalist[i].id}/dprocess?_method=DELETE" method="post">
                  <input type="submit" value="삭제">
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
    }

}