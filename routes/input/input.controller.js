//controller.js : api 동작 코드
const fs = require('fs');
const util = require('../../middleware/util');
const figures = require('../../models/figures');

exports.inputFigures = (req, res) => {
    console.log('called inputFigures');
    res.render('../views/input.html');
}

exports.parsingFigures = (req, res) => {
    console.log('called parsingFigures');
    console.log(req.file);
    let path = 'figures/' + req.file.filename;
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.dir(err);
            console.log('파일 읽기 실패.\n');
            res.status(500);
            res.json(util.successFalse(err, '파일 읽기 실패.'));
        } 
        else {
            console.log('파일 읽기 성공.')
            let parsed = data.split('\r\n'); // 행으로 나누어줌
            let regex =  /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
            for(let i = 0; i < parsed.length; i++){
                parsed[i] = parsed[i].replace(regex, ""); // 한글 제거
                parsed[i] = parsed[i].replace(" ","") // 공백 제거
                parsed[i] = parsed[i].split(", ");
            }

            console.log(figures.firstFigures(parsed));
            res.status(201);
            res.json(util.successTrue(figures.firstFigures(parsed)));
        }
    });
}


exports.parsingFigures2 = (req, res) => {
    console.log('called parsingFigures2');
    let path = req.body.filepath;
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.dir(err);
            console.log('파일 읽기 실패.\n');
            res.status(500);
            res.json(util.successFalse(err, '파일 읽기 실패.'));
        } 
        else {
            console.log('파일 읽기 성공.')
            let parsed = data.split('\r\n'); // 행으로 나누어줌
            let regex =  /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
            for(let i = 0; i < parsed.length; i++){
                parsed[i] = parsed[i].replace(regex, ""); // 한글 제거
                parsed[i] = parsed[i].replace(" ","") // 공백 제거
                parsed[i] = parsed[i].split(", ");
            }
            console.log(figures.firstFigures(parsed));
            res.status(201);
            res.json(util.successTrue(figures.firstFigures(parsed)));
        }
    });
}