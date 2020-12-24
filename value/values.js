const { worker } = require("cluster");

// 우선 하드코딩
exports.valuesToJson = (parsed, welcomeObj, noticeObj, hazardObj, workerObj, slideObj) => {

  let values = [];

  let values_1 = [];

  let item_1 = new Object();

  item_1.itemname = parsed[0];
  item_1.category = parsed[1];
  item_1.row0 = parsed[2];
  item_1.row1 = parsed[3];
  item_1.row2 = parsed[4];
  item_1.row3 = parsed[5];
  item_1.row4 = parsed[6];
  item_1.row5 = parsed[7];
  item_1.row6 = parsed[8];

  values_1.push(item_1);

  let item_2 = new Object();

  item_2.itemname = parsed[9]; //*2
  item_2.row0 = parsed[10];
  item_2.row1 = parsed[11];
  item_2.row2 = parsed[12];
  item_2.row3 = parsed[13];
  item_2.row4 = parsed[14];
  item_2.row5 = parsed[15];
  item_2.row6 = parsed[16];
  item_2.row7 = parsed[17];
  item_2.row8 = parsed[18];
  item_2.row9 = parsed[19];
  item_2.row10 = parsed[20];
  item_2.row11 = parsed[21]; // 판교 연계

  values_1.push(item_2);

  let item_3 = new Object();

  item_3.itemname = parsed[22];
  item_3.category = parsed[23];
  item_3.row0 = parsed[24];
  item_3.row1 = parsed[25];
  item_3.row2 = parsed[26];

  values_1.push(item_3);

  let item_4 = new Object();

  item_4.itemname = parsed[27];
  item_4.category = parsed[28];
  item_4.row0 = parsed[29];
  item_4.row1 = parsed[30];
  item_4.row2 = parsed[31];
  item_4.row3 = parsed[32];
  item_4.row4 = parsed[33];
  item_4.row5 = parsed[34];

  values_1.push(item_4);

  let item_5 = new Object();

  item_5.itemname = parsed[35];
  item_5.category = parsed[36];
  item_5.row0 = parsed[37];
  item_5.row1 = parsed[38];
  item_5.row2 = parsed[39];
  item_5.row3 = parsed[40];
  item_5.row4 = parsed[41];
  item_5.row5 = parsed[42];

  values_1.push(item_5);

  let item_6 = new Object();

  item_6.row0 = [welcomeObj[0], welcomeObj[1]];

  values_1.push(item_6);

  if(noticeObj !== null){
    let item_7 = new Object();
    item_7.itemname = ["*7 게시판 주요 업무"]
    item_7.row0 = noticeObj[0];
    item_7.row1 = noticeObj[1];
    item_7.row2 = noticeObj[2];
    item_7.row3 = noticeObj[3];
    item_7.row4 = noticeObj[4];
    values_1.push(item_7);
  }
  
  let item_8 = new Object();
  item_8.row0 = [hazardObj[0]];
  item_8.row1 = [hazardObj[1]];
  item_8.row2 = [hazardObj[2]];
  item_8.row3 = [hazardObj[3]];
  item_8.row4 = [hazardObj[4]];
  item_8.row5 = [hazardObj[5]];

  values_1.push(item_8);

  if(workerObj!==null){
    let item_9 = new Object();
    item_9.itemname = ["*9 근무자 현황"]
    console.log(workerObj[0]);
    item_9.row0 = workerObj[0];
    item_9.row1 = workerObj[1];
    item_9.row2 = workerObj[2];
    item_9.row3 = workerObj[3];
    values_1.push(item_9);
  }
  
  values.push(values_1);

  if(slideObj !== null){
    let values_2 = [];
    values_2.push(slideObj);
    values.push(values_2);
  }

  return JSON.parse(JSON.stringify(values));
};
