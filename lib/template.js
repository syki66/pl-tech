module.exports = {
    notice: function (title, contents) {
        return `
        <!doctype html>
        <html>
        <head>
        <title> Notice </title>
        <meta charset="utf-8">
        </head>
        <body>
        <h2>${title}</h2>
        ${contents}
        <p><a href="/board">홈으로 돌아가기</a></p>
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
        <a href="/manage/auth/login">관리자 설정</a>
        </body>
        </html>
        `
    },

    m_board: function (list) {
        return `
        <!doctype html>
        <html>
        <head>
          <title> Notice </title>
          <meta charset="utf-8">
        </head>
        <body>
        <h2>공지사항 글 관리</h2>
          ${list}
        <a href="/manage">돌아가기</a>
        </body>
        </html>
        `
    },

    m_noticeList: function (datalist) {

        var list = '<ul>';
        var i = 0;
        while (i < datalist.length) {
            list = list + `<li><a href="/manage/newnotice/${datalist[i].id}">${datalist[i].title}</a>
              <form action="/manage/newnotice/delete_process" method="post">
                  <input type="hidden" name="id" value="${datalist[i].id}">
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
        <form action ="/manage/newnotice/update_process" method="post"> 
        <input type="hidden" name="id" value="${_id}"> 
        
          <h2>${_title}</h2>
          <p><textarea name="contents">${_contents}</textarea></p>
          <p><input type="submit" value="수정"></p>
        </form>
        <a href="/manage/post">돌아가기</a>
        </body>
        </html>
        `
    }

}