module.exports = {
  template: function (title, contents, cdate, pageNum = "") {
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
                        <a class="link__1" href="javascript:history.back()">돌아가기</a>
                    </div>
                </div>
            
                <script src="/views/src/scripts/clock.js"></script>
                <script src="/views/src/scripts/index.js"></script>
            </body>
            </html>
    
    
            `;
  },

  edit: function (id, title, contents, pageNum) {
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
                            <input class="input__1" name="title" type="text" value="${title}" placeholder="제목을 입력하세요 (50자 제한)" maxlength="50" spellcheck="false">
                            <textarea class="input__2" name="contents" placeholder="내용을 입력하세요 (5000자 제한)" maxlength="5000">${contents}</textarea spellcheck="false">
                            <input class="input__3" type="submit" onclick="return checkform()" value="수정">
                            <a class="link__1" href="/admin/notice/manage/${pageNum}">돌아가기</a>
                        </form>
                    </div>
                </div>
                <script>
                    const title = document.querySelector('.input__1');
                    const content = document.querySelector('.input__2');

                    function checkform(){
                        if (title.value == "") {
                            alert("제목을 입력해주세요.");
                            return false;
                        }
                        if (content.value == "") {
                            alert("내용을 입력해주세요.");
                            return false;
                        }
                    }
                </script>
                <script src="/views/src/scripts/clock.js"></script>
                <script src="/views/src/scripts/index.js"></script>
            </body>
            </html>
            `;
  },
};
