//controller.js : api 동작 코드
const fs = require('fs');
const figures = require('../../models/figures');
const util = require('../../middleware/util');
const figurePath = 'figures.txt';

function parsingFigures(path, callback){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.dir(err);
            console.log('파일 읽기 실패.\n');
            callback(err, null);
        }
        else {
            console.log('파일 읽기 성공.')
            let parsing = data.split('\r\n'); // 행으로 나누어줌
            let regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
            for (let i = 0; i < parsing.length; i++) {
                parsing[i] = parsing[i].replace(regex, ""); // 한글 제거
                parsing[i] = parsing[i].replace(" ", "") // 공백 제거
                parsing[i] = parsing[i].split(", ");
            }
            let result = figures.firstFigures(parsing);
            callback(null, result);
        }
    });
} 

parsingFigures(figurePath, (err, data) =>{
    exports.parsed = data;
}); // 콜백이 필요해


(async () => { // 파일 수정시 읽어오기, 상시 동작
    fs.watchFile(figurePath, (curr, prev) => {
        console.log('File modification detected.');
        parsingFigures(figurePath, (err, data) =>{
            exports.parsed = data;
        });
    })
})();


