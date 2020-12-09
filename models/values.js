// 우선 하드코딩
exports.valuesToJson = (parsed) => {
    let values = [];

    let item_1 = new Object();

    item_1.itemname = parsed[0];
    item_1.row0 = parsed[1];
    item_1.row1 = parsed[2];
    item_1.row2 = parsed[3];
    item_1.row3 = parsed[4];
    item_1.row4 = parsed[5];
    item_1.row5 = parsed[6];
    item_1.row6 = parsed[7];

    values.push(item_1);

    let item_2 = new Object();
 
    item_2.itemname = parsed[8]; //*2
    item_2.row0 = parsed[9];
    item_2.row1 = parsed[10];
    item_2.row2 = parsed[11];
    item_2.row3 = parsed[12];
    item_2.row4 = parsed[13];
    item_2.row5 = parsed[14];
    item_2.row6 = parsed[15]; // 열공급량
    item_2.row7 = parsed[16];
    item_2.row8 = parsed[17];
    item_2.row9 = parsed[18];
    item_2.row10 = parsed[19];
    item_2.row11 = parsed[20]; // 판교 연계

    values.push(item_2);


    let item_3 = new Object();
 
    item_3.itemname = parsed[21];
    item_3.row0 = parsed[22];
    item_3.row1 = parsed[23];
    item_3.row2 = parsed[24];

    values.push(item_3);

    let item_4 = new Object();
 
    item_4.itemname = parsed[25];
    item_4.row0 = parsed[26];
    item_4.row1 = parsed[27];
    item_4.row2 = parsed[28];
    item_4.row3 = parsed[29];
    item_4.row4 = parsed[30];
    item_4.row5 = parsed[31];
    item_4.row6 = parsed[32];

    values.push(item_4);

    let item_5 = new Object();
 
    item_5.itemname = parsed[33];
    item_5.row0 = parsed[34];
    item_5.row1 = parsed[35];
    item_5.row2 = parsed[36];
    item_5.row3 = parsed[37];
    item_5.row4 = parsed[38];
    item_5.row5 = parsed[39];
    item_5.row6 = parsed[40];

    values.push(item_5);

    return JSON.parse(JSON.stringify(values));
}