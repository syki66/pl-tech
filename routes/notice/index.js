// index.js : 라우팅
const util = require('../../middleware/util');
const express = require('express');
const controller = require('./notice.controller');
const router = express.Router();


router.get('/', controller.inputFigures);

router.get('/:id', controller.noticeFigures);

router.get('/:id/update', controller.updateNotice);

//router.post('/:id/delete', controller.deleteNotice);

router.get('/writing', controller.writingFigures);


module.exports = router;
