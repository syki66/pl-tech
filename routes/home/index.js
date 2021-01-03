const express = require('express');
const router = express.Router();
const controller = require('./home.controller');
// input validation OK
router.get('/', controller.homepage);
// input validation OK
router.get('/getValues', controller.responseValues);

module.exports = router;