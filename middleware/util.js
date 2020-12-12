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
    if(req.session.is_logined !== undefined && req.session.is_logined){
        return true;
    }else{
        return false;
    }
}

module.exports = util;