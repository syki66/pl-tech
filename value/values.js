// 우선 하드코딩
exports.valuesToJson = (parsed, welcomeObj, workerObj=null, hazardObj) => {
  let values = [];

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

  values.push(item_1);

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

  values.push(item_2);

  let item_3 = new Object();

  item_3.itemname = parsed[22];
  item_3.category = parsed[23];
  item_3.row0 = parsed[24];
  item_3.row1 = parsed[25];
  item_3.row2 = parsed[26];

  values.push(item_3);

  let item_4 = new Object();

  item_4.itemname = parsed[27];
  item_4.category = parsed[28];
  item_4.row0 = parsed[29];
  item_4.row1 = parsed[30];
  item_4.row2 = parsed[31];
  item_4.row3 = parsed[32];
  item_4.row4 = parsed[33];
  item_4.row5 = parsed[34];

  values.push(item_4);

  let item_5 = new Object();

  item_5.itemname = parsed[35];
  item_5.category = parsed[36];
  item_5.row0 = parsed[37];
  item_5.row1 = parsed[38];
  item_5.row2 = parsed[39];
  item_5.row3 = parsed[40];
  item_5.row4 = parsed[41];
  item_5.row5 = parsed[42];

  values.push(item_5);

  let item_6 = new Object();

  item_6.row0 = [welcomeObj[0], welcomeObj[1]];

  values.push(item_6);

  if(workerObj!==null){

    let item_7 = new Object();
    
    item_7.row0 = [workerObj[0], workerObj[1], workerObj[2], workerObj[3]];
    
    values.push(item_7);

    let item_8 = new Object();

    item_8.row0 = [hazardObj[0]];
    item_8.row1 = [hazardObj[1]];
    item_8.row2 = [hazardObj[2][0], hazardObj[2][1]];
    item_8.row3 = [hazardObj[3][0], hazardObj[3][1]];

    values.push(item_8);
  }

  return JSON.parse(JSON.stringify(values));
};
