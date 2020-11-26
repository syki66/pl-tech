const express = require('express');
const router = express.Router();

const input = require('./input');
const rotate = require('./rotate');
const notice = require('./notice');
const test = require('./test');
const test1 = require('./test1');
const test2 = require('./test2');
const test3 = require('./test3');


router.use('/input', input);
router.use('/rotate', rotate);
router.use('/notice', notice);
router.use('/test', test);
router.use('/test1', test1);
router.use('/test2', test2);
router.use('/test3', test3);


module.exports = router;

