const produce = require("../values/produce");

exports.valuesToJson = (
    parsedObj1,
    parsedObj2,
    parsedObj3,
    parsedObj4,
    parsedObj5,
    welcomeObj,
    noticeObj,
    safetyObj,
    workerObj,
    slideObj,
    lotationObj,
    newsObj
) => {
    if (!produce.parsingErr) {
        let values = [];

        let pageValues = [];

        let objPrefix = ["welcome", "notice", "safety", "worker"];
        let objItemName = ["환영 문구", "게시판 주요 업무", "무재해 기록판", "근무자 현황"];

        for (let i = 1; i <= 5; ++i) {
            const item = new Object();
            const parsedObj = eval("parsedObj" + i);
            let oIdx = 0;
            let rIdx = 0;
            item.itemname = parsedObj[oIdx++];
            if (i != 2) item.category = parsedObj[oIdx++];
            for (let j = oIdx; j < parsedObj.length; ++j) {
                eval("item.row" + rIdx++ + "= parsedObj[" + j + "]");
            }
            pageValues.push(item);
        }

        for (let i = 0; i < 4; ++i) {
            const item = new Object();
            const obj = eval(objPrefix[i] + "Obj");
            item.itemname = [objItemName[i]];
            for (let j = 0; j < obj.length; ++j) {
                eval("item.row" + j + "= obj[" + j + "]");
            }
            pageValues.push(item);
        }

        values.push(pageValues);

        // values 2번째 요소
        let slideValues = [];

        let slide = new Object();
        slide.itemname = ["슬라이드 및 뉴스탭 설정"];
        slide.row0 = slideObj;
        slide.row1 = lotationObj;
        slide.row2 = newsObj;
        slideValues.push(slide);

        values.push(slideValues);

        return JSON.parse(JSON.stringify(values));
    }
};
