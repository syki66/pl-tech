module.exports={
    workerList: function (name, data) {
        var list = `<select name="${name}">
            <option value="" disabled selected>직원선택</option>`;
        var i = 0;
        while (i < data.length) {
            list =
                list + `<option value="${data[i]}">${data[i].split(".")[0]}</option>`;
            i = i + 1;
        }
        list = list + "</select>";

        return list;
    },

    template: function (dStaff, leader, staff1, staff2, staff3) {
        return `
            <!doctype html>
            <html>
            <head>
                <title> worker </title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width,  initial-scale=1.0">
                <title>관리자 설정 페이지 - 근무자 현황 관리</title>
                <link rel="stylesheet" type="text/css" href="/views/src/styles/page.css" />
                <link rel="stylesheet" href="/views/src/styles/adminPages.css">
                <link rel="stylesheet" href="/views/src/styles/jquery-ui.css" type="text/css" />
                <script src="/views/src/scripts/jquery.min.js"></script>
    
                <link rel="stylesheet" href="/views/src/styles/template/admin-worker-manage.css">
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
                    <form action="/admin/worker/upload" method="post" enctype="multipart/form-data">
                        <input class="input__1" type="text" name="dep" placeholder="부서" maxlength="10">
                        <input class="input__2" type="text" name="rank" placeholder="직급" maxlength="10">
                        <input class="input__3" type="text" name="name" placeholder="이름" maxlength="10">
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
                    <form action="/admin/worker/delete?_method=DELETE" method="post"">
                        <p>${dStaff}</p>
                        <input class="input__6" type="submit" value="삭제">
                     </form>
                </div>
                <div class="select__container">
                    <p class="form__title">근무자 현황</p>
                    <form action="/admin/worker" method="post">
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
                <p><a class="link__1" href="/admin">돌아가기</a></p>
            </div>
            
            <script src="/views/src/scripts/clock.js"></script> 
            <script src="/views/src/scripts/index.js"></script>
            <script>
            $(document).ready(function(){
                let fileTarget = $('.upload-hidden');
                let fileDisplay = $('.upload-name');
    
                fileDisplay.val('사진을 첨부해주세요.');
                fileTarget.change(function(){
                    let fakepath = this.value.search(/fakepath.*/);
                    let filename = '';
                    if(fakepath){
                        filename = this.value;
                        filename = filename.substring(fakepath + 9, filename.length);
                    } else {
                        alert('경로가 올바르지 않습니다.');
                    }
                    let ext = filename.split('.')[1].toLowerCase();
                    switch (ext) {
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                            fileDisplay.val(filename);
                            break;
                        default:
                            alert('지원하지 않는 형식입니다.');
                            this.value = '';
                    }
                });
            });
    
            const leader = document.querySelector(".select__container select[name=leader]");
            const staff1 = document.querySelector(".select__container select[name=staff1]");
            const staff2 = document.querySelector(".select__container select[name=staff2]");
            const staff3 = document.querySelector(".select__container select[name=staff3]");
            
            function paintPage() {
                const json = JSON.parse(localStorage.getItem("json"));
                json.data[0][8]["row${0}"] ? leader.value = json.data[0][8]["row${0}"][1] : false;
                json.data[0][8]["row${1}"] ? staff1.value = json.data[0][8]["row${1}"][1] : false;
                json.data[0][8]["row${2}"] ? staff2.value = json.data[0][8]["row${2}"][1] : false;
                json.data[0][8]["row${3}"] ? staff3.value = json.data[0][8]["row${3}"][1] : false;
            }
    
            paintPage();
            </script>
            </body>
            </html>
            `;
    }
}