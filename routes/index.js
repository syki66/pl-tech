const express = require('express');
const router = express.Router();

const input = require('./input');
const rotate = require('./rotate');

router.use('/input', input);
router.use('/rotate', rotate);

module.exports = router;