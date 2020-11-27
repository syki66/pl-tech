const express = require('express');
const router = express.Router();

const input = require('./input');
const rotate = require('./rotate');
const board = require('./board');
const manage = require('./manage');


router.use('/input', input);
router.use('/rotate', rotate);
router.use('/board', board);
router.use('/manage', manage);


module.exports = router;

