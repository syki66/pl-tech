const express = require('express');
const router = express.Router();

const input = require('./input');
<<<<<<< HEAD
const rotate = require('./rotate');
const board = require('./board');
const manage = require('./manage');


router.use('/input', input);
router.use('/rotate', rotate);
router.use('/board', board);
router.use('/manage', manage);


module.exports = router;
=======
const home = require('./home');

router.use('/input', input);
router.use('/home', home);
>>>>>>> df782bb885257dc6ae535b901a77a5c9d0798660

