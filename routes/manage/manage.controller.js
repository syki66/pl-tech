const util = require('../../middleware/util');

exports.manageFigures = (req,res) =>{
    console.log('called manageFigures')
    
    res.render('../views/manage.html');

}

exports.newnoticeFigures = (req,res) =>{
    console.log('called newnoticeFigures')

}

exports.noticeCreate = (req,res) =>{
    console.log('called noticeCreate')

    var body = req.body;
    var _title = body.title;
    var _contents = body.contents;
    
    models.Notice.create({
        title: _title,
        contents : _contents
    })
    .then(result=>{
        console.log(result);
        res.writeHead(302, {Location : '/board'});
        res.end('success')
    })
    .catch(err=>{
        console.error(err);
    })
}

exports.noticeUpdate = (req,res) =>{
    console.log('called noticeUpdate')

}

exports.postFigures = (req,res) =>{
    console.log('called postFigures')

}