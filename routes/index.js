const express = require('express');
const router = express.Router();

const main = require('./main/main.route');

router.use('/main', main);

module.exports = router;