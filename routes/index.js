const express = require('express');
const router = express.Router();

const input = require('./input');
const rotate = require('./rotate');
const notice = require('./notice');

router.use('/input', input);
router.use('/rotate', rotate);
router.use('/notice', notice);

module.exports = router;

