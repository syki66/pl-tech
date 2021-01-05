module.exports={
    checkList: function (datalist) {
        // /admin/slide
        var list = `<div class="checkbox__container">`;
        var i = 0;
        while (i < datalist.length) {
            list =
                list +
                `<div class="check-box__items">
                                    <input class="check-box" type="checkbox" id="check${datalist[i]}"name="check${datalist[i]}" value="${datalist[i]}" onchange="checkItem(this)">
                                    <label for="check${datalist[i]}">
                                        <img class="check__svg" src="/views/src/images/check.svg" />
                                    </label>
                                    <strong>${datalist[i]}</strong>
                                </div>`;
            i = i + 1;
        }
        list = list + `
        </div>`;
        return list;
    },

    template: function (list) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>슬라이드 및 뉴스탭 관리</title>
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
            
                    <div class="outter__container">
                        <h2>슬라이드 및 뉴스탭 관리</h2>
                        
                        
                            <div class="inner-container">
                                <div class="inner-container__1">
                                    <form class="form__1" action="/admin/slide" method="post">
                                        <div class="inner-title__1">슬라이드 순서</div>
                                        ${list}
                                        <input class="result-box" type="text" name="checkResult" id="checkResult" readonly>
                                        <input class="all-btn" type="button" onclick="allBtnToggle(this)" value="전체 선택">
                                        <input class="apply-btn__1" type="submit" value="적용">
                                    </form>
                                </div>
                                <div class="inner-container__2">
                                    <form class="form__2" action="/admin/slide/lotation" method="post">
                                        <div class="slide-rotation">
                                            <div class="inner-title__2">슬라이드 순환 시간</div>
                                            <div class="time-input"><input class="sHour" name="sHour" type="text" placeholder="H" maxlength="2">시</div>
                                            <div class="time-input"><input class="sMinute" name="sMinute" type="text" placeholder="M" maxlength="2">분</div>
                                            <div class="time-input"><input class="sSecond" name="sSecond" type="text" placeholder="S" maxlength="2">초</div>
                                        </div>
                                        <input class="apply-btn__2" type="submit" value="적용">
                                    </form>
                                    <form class="form__3" action="/admin/slide/news" method="post">
                                        <div class="news-rotation">
                                            <div class="inner-title__2">뉴스탭 순환 시간</div>
                                            <div class="time-input"><input class="nHour" name="nHour" type="text" placeholder="H" maxlength="2">시</div>
                                            <div class="time-input"><input class="nMinute" name="nMinute" type="text" placeholder="M" maxlength="2">분</div>
                                            <div class="time-input"><input class="nSecond" name="nSecond" type="text" placeholder="S" maxlength="2">초</div>
                                        </div>
                                        <input class="apply-btn__3" type="submit" value="적용">
                                    </form>
                                </div>
                            </div>
                        <a class="link__1" href="/admin">돌아가기</a>
                    </div>
                </div>

                <script src="/views/src/scripts/clock.js"></script>
                <script src="/views/src/scripts/index.js"></script>
                <script>
                    const json = JSON.parse(localStorage.getItem("json"));
                    slide_t = json.data[1][0]['row1'][0];
                    news_t = json.data[1][0]['row2'][0];

                    document.querySelector('.sHour').value = parseInt(slide_t / 3600);
                    document.querySelector('.sMinute').value = parseInt((slide_t % 3600) / 60);
                    document.querySelector('.sSecond').value = parseInt(slide_t % 60);

                    document.querySelector('.nHour').value = parseInt(news_t / 3600);
                    document.querySelector('.nMinute').value = parseInt((news_t % 3600) / 60);
                    document.querySelector('.nSecond').value = parseInt(news_t % 60);
                </script>
                <script>
                    const cBoxes = document.querySelectorAll('.check-box');
                    const resultBox = document.querySelector('.result-box');
                    const allBtn = document.querySelectorAll('.all-btn');

                    Array.prototype.remove = function() {
                        var what, a = arguments, L = a.length, ax;
                        while (L && this.length) {
                            what = a[--L];
                            while ((ax = this.indexOf(what)) !== -1) {
                                this.splice(ax, 1);
                            }
                        }
                        return this;
                    };

                    let cBoxArray = [];
                    function checkItem(e){
                        const eId = e.id.split('check')[1]
                        e.checked==true ? cBoxArray.push(eId) : cBoxArray.remove(eId);
                        resultBox.value = cBoxArray;
                    }
                    function allBtnToggle(element){
                        if (element.value == "전체 선택"){
                            element.value = "전체 해제"
                            cBoxes.forEach((e)=>{
                                if (e.checked==false){
                                    e.click();
                                }
                            })
                        } else{
                            element.value = "전체 선택";
                            cBoxes.forEach((e)=>{
                                if (e.checked==true){
                                    e.click();
                                }
                            })
                        }
                    }
                </script>
            </body>
            </html>
    
    
            `;
    }
}