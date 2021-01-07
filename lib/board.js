module.exports = {
  pageBar: function (pnum, pages) {
    // /admin/notice/manage/:pageNum
    // /board/more/:pageNum
    var pageBar = "";
    let i;
    let max;
    var right = false;
    var left = false;
    // 5페이지 이상
    if (pages > 5) {
      right = true;
      // pageNum 4 이상일 경우
      if (pnum >= 4) {
        left = true;
        i = pnum - 2;
        let gap = 0;
        if (pnum + 2 > pages) {
          gap = parseInt(pnum) + 2 - pages;
        }
        i = i - gap;
      } else {
        i = 1;
      }
      max = i + 5;

      if (left) {
        pageBar = pageBar + `<a class="nav" href="${parseInt(pnum) - 1}">◀</a>`;
      }
      while (i < max) {
        if (i == pnum) {
          pageBar = pageBar + `<a class="sel">[${i}]</a>`;
        } else {
          pageBar = pageBar + `<a class="nav" href="${i}">[${i}]</a>`;
        }
        i = i + 1;
      }
      if (right && parseInt(pnum) !== pages) {
        pageBar = pageBar + `<a class="nav" href="${parseInt(pnum) + 1}">▶</a>`;
      }
    }
    // 5페이지 이하
    else {
      i = 1;
      max = pages;

      while (i <= max) {
        if (i == pnum) {
          pageBar = pageBar + `<a class="sel">[${i}]</a>`;
        } else {
          pageBar = pageBar + `<a class="nav" href="${i}">[${i}]</a>`;
        }
        i = i + 1;
      }
    }
    pageBar = `<div class="nav__container">${pageBar}</div>`;

    return pageBar;
  },

  template: function (list, ptemplate, isAdminPage) {
    // /admin/post/manage/:pageNum
    // /board/more/:pageNum
    var template = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                `;
    template =
      template +
      (isAdminPage
        ? `
                        <title>관리자 설정 페이지 - 공지 관리</title>
                `
        : `
                        <title>공지사항 더보기</title>
                `);
    template =
      template +
      `
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

    template =
      template +
      (isAdminPage
        ? `
                                <h2>공지사항 글 관리</h2>
                `
        : `
                                <h2>공지사항 게시판</h2>
                `);

    template = template + `${list}`;

    template =
      template +
      (isAdminPage
        ? `
                                <a class="link__1" href="/admin">돌아가기</a>
                `
        : `
                                <a class="link__1" href="/views/src/pages/7.html">돌아가기</a>
                `);

    template =
      template +
      (isAdminPage
        ? `
                                <a class="link__2" href="/admin/notice">공지사항 작성하기</a>
                `
        : `
                        
                `);

    template =
      template +
      `
                            </div>
                            <div class="pages__container">
                                ${ptemplate}
                            </div>
                        </div>
                        <script src="/views/src/scripts/clock.js"></script>
                        <script src="/views/src/scripts/index.js"></script>
                        
                        <script type="text/javascript">
                        function validate(form) {
                            if (confirm("공지사항을 삭제하시겠습니까?")) {
                                return true;
                            } else {
                                return false;
                            }
                        }
    
                        </script>
                    </body>
                    </html>
                `;

    return template;
  },

  noticeList: function (data, pageNum, isAdminPage) {
    // /admin/post/manage/:num
    var list =
      '<ul>\
                            <li>\
                                <div class="link__container">\
                                    <div class="board__link">\
                                        <div class="date">날짜</div>\
                                        <div class="title">제목</div>\
                                    </div>\
                                </div>\
                            </li>';
    var i = 0;
    while (i < data.length) {
      let pnum;
      if (i === 0) {
        pnum = parseInt(pageNum) - 1;
      } else {
        pnum = parseInt(pageNum);
      }
      let date = `${
        data[i].cdate.substring(5, 7) + "/" + data[i].cdate.substring(8, 10)
      } (${data[i].cdate.substring(11, 12)})`;
      list =
        list +
        (isAdminPage
          ? `
                    <li>
                        <div class="link__container">
                            <a class="board__link" href="/admin/notice/${data[i].id}/update?pageNum=${pageNum}">
                                <div class="date">${date}</div>
                                <div class="title">${data[i].title}</div>
                            </a>
                        </div>
                        <form class="del__container"  action="/admin/notice/${data[i].id}/dprocess?_method=DELETE" method="post" onsubmit="return validate(this);">
                            <input type="hidden" name="pageNum" value="${pnum}">
                            <input class="del__btn" type="submit" value="삭제">
                        </form>
                    </li>
                `
          : `
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
    list = list + "</ul>";

    return list;
  },
};
