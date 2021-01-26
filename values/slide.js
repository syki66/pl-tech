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

        let item_6 = new Object();

        item_6.itemname = ["환영 문구"];
        item_6.row0 = [welcomeObj[0]];
        item_6.row1 = [welcomeObj[1]];

        pageValues.push(item_6);

        if (noticeObj !== null) {
            let item_7 = new Object();
            item_7.itemname = ["게시판 주요 업무"];
            item_7.row0 = noticeObj[0];
            item_7.row1 = noticeObj[1];
            item_7.row2 = noticeObj[2];
            item_7.row3 = noticeObj[3];
            item_7.row4 = noticeObj[4];
            pageValues.push(item_7);
        }

        let item_8 = new Object();
        item_8.itemname = ["무재해 기록판"];
        item_8.row0 = [safetyObj[0]];
        item_8.row1 = [safetyObj[1]];
        item_8.row2 = [safetyObj[2]];
        item_8.row3 = [safetyObj[3]];
        item_8.row4 = [safetyObj[4]];
        item_8.row5 = [safetyObj[5]];

        pageValues.push(item_8);

        if (workerObj !== null) {
            let item_9 = new Object();
            item_9.itemname = ["근무자 현황"];
            item_9.row0 = workerObj[0];
            item_9.row1 = workerObj[1];
            item_9.row2 = workerObj[2];
            item_9.row3 = workerObj[3];
            pageValues.push(item_9);
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
