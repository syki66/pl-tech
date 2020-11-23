const express = require('express');
const router = express.Router();
const controller = require('./home.controller');

router.get('/', controller.responseFigures);

module.exports = router;