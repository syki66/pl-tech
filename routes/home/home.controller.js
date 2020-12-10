const express = require('express');
const util = require('../../middleware/util');
const inputController = require('../input/input.controller');

exports.homepage = (req, res) => {
    res.status(201);
    res.render('../views/index.html');
}

exports.responseValues = (req, res) => {
    let data = inputController.parsed;
    if(data === null || data === undefined) {
        const err = new Error('parsed data is not exist!');
        console.dir(err);
        console.log('파싱된 데이터가 존재하지 않습니다.\n');
        res.status(500);
        res.json(util.successFalse(err, '파싱된 데이터가 존재하지 않습니다.'));
    } else {
        console.log(data);
        res.status(201);
        res.json(util.successTrue(data));
    }
};