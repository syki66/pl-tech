const fs = require("fs");
const Iconv = require("iconv").Iconv;
const slide = require("../values/slide");
const objects = require("../values/objects");
const DCSPath = "DCS_val.csv";
const models = require("../models");

const produceValues = (path, callback) => {
    let encode = new Iconv("euc-kr", "utf-8"); // csv 파일을 그냥 읽어오면 한글이 깨지기 때문에 인코딩 필요

    fs.readFile(path, async (err, data) => {
        if (err) {
            console.dir(err);
            console.log("DCS 파일 읽기 실패");
            console.log("루트 폴더에 DCS 파일이 있는지 확인하십시오");
            callback(err, null);
        } else {
            console.log("DCS 파일 읽기 성공");

            let content = encode.convert(data); // euc-kr => utf-8로 컨버팅
            data = content.toString("utf-8"); // 컨버팅 데이터 utf-8 문자열로 변환

            let parsing = data.split("\r\n"); // 행으로 나누어줌
            // let pageNum = 1;
            const total = [];
            for (let i = 0; i < parsing.length; ++i) {
                const part = [];
                if (parsing[i][0] === "*") {
                    // const Obj = eval("objects.parsedObj" + pageNum);
                    parsing[i] = await removeSpecial(parsing[i]);
                    parsing[i] = parsing[i].substring(3, parsing[i].length);
                    part.push(parsing[i]);
                    let j = i + 1;
                    for (; j < parsing.length; ++j) {
                        if (parsing[j][0] === "*") break;
                        parsing[j] = await removeSpecial(parsing[j]);
                        part.push(parsing[j]);
                    }
                    total.push(part);
                    // pageNum++;
                    i = j - 1;
                }
            }

            for (let i = 0; i < 5; ++i) {
                // const Obj = eval("objects.parsedObj" + i);
                for (let j = 0; j < total[i].length; j++) {
                    if (total[i][j] == "") {
                        total[i].splice(j, 1);
                    }
                }
                for (let j = 0; j < total[i].length; ++j) {
                    total[i][j] = total[i][j].split(",");
                    for (let k = 0; k < total[i][j].length; ++k) {
                        if (!(await testLetters(total[i][j][k]))) total[i][j][k] = numberWithCommas(total[i][j][k]);
                    }
                }
                eval("objects.parsedObj" + (i + 1) + "= total[" + i + "]");
            }

            let result;
            models.Notice.findAll({
                attributes: ["id", "title", "cdate"],
                raw: true,
                order: [["id", "DESC"]],
                limit: 5,
            })
                .then((data) => {
                    // console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        let cdate = data[i].cdate.substring(5, 7) + "/" + data[i].cdate.substring(8, 10);
                        let day = data[i].cdate.substring(11, 12);
                        const row = [cdate, day, data[i].title, String(data[i].id)];
                        objects.noticeObj[i] = row;
                    }
                    result = slide.valuesToJson(
                        objects.parsedObj1,
                        objects.parsedObj2,
                        objects.parsedObj3,
                        objects.parsedObj4,
                        objects.parsedObj5,
                        objects.welcomeObj,
                        objects.noticeObj,
                        objects.safetyObj,
                        objects.workerObj
                    );
                    callback(null, result);
                })
                .catch((err) => {
                    console.log(err);
                    callback(err, null);
                });
        }
    });
};

const testLetters = (str) => {
    return new Promise((resolve, reject) => {
        try {
            let kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g; // 한글 정규식
            let eng = /[a-zA-Z]/g;
            resolve(kor.test(str) || eng.test(str));
        } catch (error) {
            reject(error);
        }
    });
};

const removeSpecial = (str) => {
    return new Promise((resolve, reject) => {
        try {
            let i;
            for (i = 0; i < str.length; ++i) {
                let special = /[\{\}\[\]\/?.,;:|\)~`!^\_+<>@\#$%&\\\=\(\'\"]/gi; // 특수문자 정규식
                if (!special.test(str[i])) break;
            }

            str = str.substring(i, str.length);
            for (i = str.length - 1; i >= 0; --i) {
                let special = /[\{\}\[\]\/?.,;:|\)~`!^\_+<>@\#$%&\\\=\(\'\"]/gi; // 특수문자 정규식
                if (!special.test(str[i])) break;
            }

            str = str.substring(0, i + 1);

            resolve(str);
        } catch (error) {
            reject(error);
        }
    });
};

function produceWorkerFolder(dir) {
    if (!fs.existsSync(dir)) {
        console.log("근무자 정보 폴더 존재하지 않음");
        fs.mkdirSync(dir);
        console.log("폴더 생성 완료");
    } else {
        console.log("근무자 정보 폴더 존재");
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

setTimeout(() => {
    produceValues(DCSPath, (err, data) => {
        if (!err) {
            exports.values = data;
        } else {
            exports.parsingErr = err;
        }
    });
}, 1000);

produceWorkerFolder("./worker");

(async () => {
    // 파일 수정시 읽어오기, 상시 동작
    fs.watchFile(DCSPath, (curr, prev) => {
        console.log("File modification detected.");
        produceValues(DCSPath, (err, data) => {
            exports.values = data;
        });
    });
})();
