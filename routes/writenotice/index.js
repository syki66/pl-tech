// index.js : 라우팅
const express = require('express');
const controller = require('./writenotice.controller');
const router = express.Router();
const fs = require('fs');
const qs = require('querystring');

router.get('/', function(req,res){
    res.render('../views/writenotice.html');

    
    // var body = '';
    // req.on('data', function(data){
    //     body = body + data;
    // })

    // req.on('end', function(){
    //     var post = qs.parse(body);
    //     var contents = post.contents;
    //     fs.writeFile('data/notice', contents, 'utf-8', function(err){
            
    //     })
    // })
});

router.post('/', function(req,res){
    var body = req.body;
    console.log(body);
})

module.exports = router;