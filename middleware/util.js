const moment = require('moment');
var util = {};

util.successTrue = function (data) {
    return {
        success: true,
        timestamp: new Date().getTime(),
        data: data
    };
};

util.successTrueDetail = function (spec, review, news, youtube) {
    return {
        success: true,
        timestamp: new Date(Date.now()),
        spec: spec,
        review: review,
        news: news,
        youtube: youtube
    };
};

util.successFalse = function (err, comment) {
    if (!err && !comment) comment = 'data not found';

    return {
        success: false,
        timestamp: new Date().getTime(),
        data: (err) ? util.parseError(err) : null,
        comment: (comment) ? comment : null
    };
};

util.parseError = function (err) {
    var parsed = {
        name: err.name,
        msg: err.message
    };
    if (err.name == 'ValidationError' || err.name == 'AuthenticationError') {
        return err;
    }
    else {
        return parsed;
    }
};

util.isAdminStatus = function(req, res){
    // console.log(req.session);
    if(req.session.isLogin !== undefined && req.session.isLogin){
        return true;
    }else{
        return false;
    }
};

util.currentDate = function(){
    // 서울 시간 기준

    require('moment-timezone');
    moment.tz.setDefault("Asia/Seoul");
    
    // 날짜
    var date = moment().format('YYYY-MM-DD');
    // 요일
    var weeks = ['일','월','화','수','목','금','토'];
    var week = weeks[new Date(date).getDay()];
    // 시간
    var time = moment().format('HH:mm');

    var cdate = `${date}/${week}/${time}`;
    
    return cdate;
};

util.cdateParser = function(cdate){
    // 서울 시간 기준
    var sdate = cdate.split('-');
    var month = sdate[1];
    var day = sdate[2].split('/')[0];
    var week = sdate[2].split('/')[1];

    return {
        date : `${month}/${day}`,
        week : week
    }
}

util.noticeCdate = function(cdate){
    console.log(cdate);
    var sdate = cdate.split('/');
    return `${sdate[0]} (${sdate[1]}) ${sdate[2]}`;
}

util.rmExtention = function(data){
    var list = [];
    data.forEach(file=>{
        list.push(file.split('.')[0])
    
    })
    return list;
}

module.exports = util;