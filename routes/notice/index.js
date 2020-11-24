// index.js : 라우팅
const util = require('../../middleware/util');
const express = require('express');
const controller = require('./notice.controller');
const router = express.Router();


router.get('/', controller.inputFigures)
router.get('/writing', controller.writingFigures);
router.post('/writing/parsing', controller.parsingFigures);

module.exports = router;
