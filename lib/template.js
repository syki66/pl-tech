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
        <!doctype html>
        <html>
        <head>
          <title> Notice </title>
          <meta charset="utf-8">
        </head>
        <body>
        <h2>공지사항 글 관리</h2>
          ${list}
        <a href="/admin">돌아가기</a>
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