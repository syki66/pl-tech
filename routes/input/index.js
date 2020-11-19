// index.js : 라우팅
const express = require('express');
const controller = require('./input.controller');
const router = express.Router();

const multer = require('multer');

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

module.exports = router;