module.exports={
    checkList: function (datalist) {
        // /admin/slide
        var list = `<div class="checkbox__container">`;
        var i = 0;
        while (i < datalist.length) {
            list =
                list +
                `<div class="check-box__items">
                                    <input class="check-box" type="checkbox" id="check${datalist[i]}"name="check${datalist[i]}" value="${datalist[i]}" onchange="checkBox(this)">
                                    <label for="check${datalist[i]}">
                                        <img class="check__svg" src="/views/src/images/check.svg" />
                                    </label>
                                    <strong>${datalist[i]}</strong>
                                </div>`;
            i = i + 1;
        }
        list = list + `
            <div class="check-box__items">
                <input class="check-box__all" type="checkbox" id="checkAll"name="checkAll" value="${datalist}" onchange="cboxAllToggle(this)">
                <label for="checkAll">
                    <img class="check__svg" src="/views/src/images/check.svg" />
                </label>
                <strong>All</strong>
            </div>
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
                                        <input class="apply-btn__1" type="submit" value="적용">
                                    </form>
                                </div>
                                <div class="inner-container__2">
                                    <form class="form__2" action="/admin/slide/lotation" method="post">
                                        <div class="slide-rotation">
                                            <div class="inner-title__2">슬라이드 순환 시간</div>
                                            <div class="time-input"><input class="sHour" name="sHour" type="text" placeholder="H">시</div>
                                            <div class="time-input"><input class="sMinute" name="sMinute" type="text" placeholder="M">분</div>
                                            <div class="time-input"><input class="sSecond" name="sSecond" type="text" placeholder="S">초</div>
                                        </div>
                                        <input class="apply-btn__2" type="submit" value="적용">
                                    </form>
                                    <form class="form__3" action="/admin/slide/news" method="post">
                                        <div class="news-rotation">
                                            <div class="inner-title__2">뉴스탭 순환 시간</div>
                                            <div class="time-input"><input class="nHour" name="nHour" type="text" placeholder="H">시</div>
                                            <div class="time-input"><input class="nMinute" name="nMinute" type="text" placeholder="M">분</div>
                                            <div class="time-input"><input class="nSecond" name="nSecond" type="text" placeholder="S">초</div>
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
                    slide_order = json.data[1][0]['row0'];
                    slide_t = json.data[1][0]['row1'][0];
                    news_t = json.data[1][0]['row2'][0];

                    document.querySelector('.sHour').value = parseInt(slide_t / 3600);
                    document.querySelector('.sMinute').value = parseInt((slide_t % 3600) / 60);
                    document.querySelector('.sSecond').value = parseInt(slide_t % 60);

                    document.querySelector('.nHour').value = parseInt(news_t / 3600);
                    document.querySelector('.nMinute').value = parseInt((news_t % 3600) / 60);
                    document.querySelector('.nSecond').value = parseInt(news_t % 60);

                    document.querySelector('.result-box').value = slide_order;

                    // console.log(slide_order.length)
                    if (slide_order[0]){
                        for (let i=0; i<slide_order.length; i++){
                            document.querySelectorAll('.check-box')[slide_order[i]-1].checked = true;
                            // console.log(slide_order[i])
                        }
                    }
                    
                    const resultBox = document.querySelector('.result-box');
                    const cBoxAll = document.querySelector('.check-box__all');

                    function cboxAllToggle(cboxAll){
                        resultBox.value = "";
                        document.querySelectorAll('.check-box').forEach((each)=>{
                            each.checked = false;
                        });
                        if( cboxAll.checked==true ){
                            resultBox.value = cBoxAll.value;
                        }
                    }
                </script>
                <script>
    
                function checkBox(checked){
                    if (cBoxAll.checked == true){
                        resultBox.value = "";
                        cBoxAll.checked = false;
                    }
                    var result = document.getElementById("checkResult");
                    if( checked.checked==true ){
                        // console.log(result.value);
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
    
    
            `;
    }
}