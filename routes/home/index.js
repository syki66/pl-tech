const express = require('express');
const router = express.Router();
const controller = require('./home.controller');

router.get('/', controller.homepage);
router.get('/getValues', controller.responseValues);

module.exports = router;