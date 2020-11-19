// index.js : 라우팅
const express = require('express');
const controller = require('./notice.controller');
const router = express.Router();
const fs = require('fs');

// router.get('/', controller.inputFigures);

router.post('/', function(req,res){
    var body = req.body;
    var contents = body.contents;
    console.log(body);
    fs.writeFile('data/notice', body.contents, 'utf-8', function(err){

    })

    var template =`
    <!doctype html>
    <html>
    <head>
        <title>WELCOME</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1>NOTICE</h1>
    ${contents}
    </body>
    </html>`
    
    res.end(template);

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
})

module.exports = router;