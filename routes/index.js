const express = require('express');
const router = express.Router();

const input = require('./input');
const home = require('./home');

router.use('/input', input);
router.use('/home', home);

module.exports = router;