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

            // parsing.splice(0, 1);
            // parsing.splice(7, 2);
            // parsing.splice(9, 1);
            // parsing.splice(20, 1);
            // parsing.splice(23, 1);
            // parsing.splice(27, 1);
            // parsing.splice(28, 1);
            // parsing.splice(35, 1);
            // parsing.splice(36, 1);

            console.log(parsing);
            let regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;

            let i = 0;
            let j = 0;

            for (i = 0; i < parsing.length; ++i) {
                if (parsing[i][0] === '*') {
                    console.log(parsing[i]) // *1 열생산량 및 판매량
                    j = i + 1;
                    while (true) {
                        if (j >= parsing.length) break;
                        if (parsing[j] === '') {
                            parsing.splice(j, 1);
                            i = j - 1;
                            break;
                        }
                        console.log(parsing[j]);
                        parsing[j] = parsing[j].replace(regex, ""); // 한글 제거
                        parsing[j] = parsing[j].replace(" ", "") // 공백 제거
                        parsing[j] = parsing[j].split(", ");
                        j++;
                    }
                }
            }

            console.log(parsing);

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


