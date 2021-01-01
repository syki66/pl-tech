exports.valuesToJson = (
  parsedObj,
  welcomeObj,
  noticeObj,
  safetyObj,
  workerObj,
  slideObj,
  lotationObj,
  newsObj
) => {
  let values = [];

  let pageValues = [];

  let item_1 = new Object();

  item_1.itemname = parsedObj[0];
  item_1.category = parsedObj[1];
  item_1.row0 = parsedObj[2];
  item_1.row1 = parsedObj[3];
  item_1.row2 = parsedObj[4];
  item_1.row3 = parsedObj[5];
  item_1.row4 = parsedObj[6];
  item_1.row5 = parsedObj[7];
  item_1.row6 = parsedObj[8];

  pageValues.push(item_1);

  let item_2 = new Object();

  item_2.itemname = parsedObj[9]; //*2
  item_2.row0 = parsedObj[10];
  item_2.row1 = parsedObj[11];
  item_2.row2 = parsedObj[12];
  item_2.row3 = parsedObj[13];
  item_2.row4 = parsedObj[14];
  item_2.row5 = parsedObj[15];
  item_2.row6 = parsedObj[16];
  item_2.row7 = parsedObj[17];
  item_2.row8 = parsedObj[18];
  item_2.row9 = parsedObj[19];
  item_2.row10 = parsedObj[20];
  item_2.row11 = parsedObj[21]; // 판교 연계

  pageValues.push(item_2);

  let item_3 = new Object();

  item_3.itemname = parsedObj[22];
  item_3.category = parsedObj[23];
  item_3.row0 = parsedObj[24];
  item_3.row1 = parsedObj[25];
  item_3.row2 = parsedObj[26];

  pageValues.push(item_3);

  let item_4 = new Object();

  item_4.itemname = parsedObj[27];
  item_4.category = parsedObj[28];
  item_4.row0 = parsedObj[29];
  item_4.row1 = parsedObj[30];
  item_4.row2 = parsedObj[31];
  item_4.row3 = parsedObj[32];
  item_4.row4 = parsedObj[33];
  item_4.row5 = parsedObj[34];

  pageValues.push(item_4);

  let item_5 = new Object();

  item_5.itemname = parsedObj[35];
  item_5.category = parsedObj[36];
  item_5.row0 = parsedObj[37];
  item_5.row1 = parsedObj[38];
  item_5.row2 = parsedObj[39];
  item_5.row3 = parsedObj[40];
  item_5.row4 = parsedObj[41];
  item_5.row5 = parsedObj[42];

  pageValues.push(item_5);

  let item_6 = new Object();

  item_6.itemname = ["6 환영 문구"];
  item_6.row0 = [welcomeObj[0]];
  item_6.row1 = [welcomeObj[1]];

  pageValues.push(item_6);

  if (noticeObj !== null) {
    let item_7 = new Object();
    item_7.itemname = ["7 게시판 주요 업무"];
    item_7.row0 = noticeObj[0];
    item_7.row1 = noticeObj[1];
    item_7.row2 = noticeObj[2];
    item_7.row3 = noticeObj[3];
    item_7.row4 = noticeObj[4];
    pageValues.push(item_7);
  }

  let item_8 = new Object();
  item_8.itemname = ["8 무재해 기록판"];
  item_8.row0 = [safetyObj[0]];
  item_8.row1 = [safetyObj[1]];
  item_8.row2 = [safetyObj[2]];
  item_8.row3 = [safetyObj[3]];
  item_8.row4 = [safetyObj[4]];
  item_8.row5 = [safetyObj[5]];

  pageValues.push(item_8);

  if (workerObj !== null) {
    let item_9 = new Object();
    item_9.itemname = ["9 근무자 현황"];
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
};
