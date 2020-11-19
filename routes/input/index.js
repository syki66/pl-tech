// index.js : 라우팅
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const controller = require('./input.controller');
const figurePath = 'figures.txt'

const router = express.Router();

let today = new Date();
let date = String(today.getFullYear()) + String(today.getMonth() + 1) + String(today.getDate());
let time = String(today.getHours()) + String(today.getMinutes()) + String(today.getSeconds())

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'figures'); // null에는 에러 처리
    },
    filename: function(req, file, cb) {
        cb(null, date + '_' + time + "_" + file.fieldname);
    }
})

const upload = multer({ storage: storage }); // 업로드 경로 설정

router.get('/', controller.inputFigures);
router.post('/', upload.single('inputfile'), controller.parsingFigures);
router.post('/2', controller.parsingFigures2);

module.exports = router;