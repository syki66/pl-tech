const express = require('express');
const router = express.Router();
const controller = require('./main.controller');

router.get('/', function (req, res, next) {
    res.send('hello');
});

module.exports = router;