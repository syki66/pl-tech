const express = require('express');
const router = express.Router();

const input = require('./input');
const board = require('./board');
const manage = require('./manage');
const home = require('./home');

router.use('/input', input);
router.use('/board', board);
router.use('/manage', manage);
router.use('/home', home);

module.exports = router;

