// index.js : 라우팅
const express = require('express');
const controller = require('./input.controller');
const router = express.Router();

router.get('/', controller.inputFigures);
router.post('/parsing', controller.parsingFigures);

module.exports = router;