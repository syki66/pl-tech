const util = require("../../middleware/util");
const produce = require("../../values/produce");
const { parsingErrAlert } = require("../../values/alert");
const { template } = require("../../lib/alert");

exports.homepage = (req, res) => {
  if (!produce.parsingErr) {
    res.status(200);
    res.render("../views/index.html");
  } else {
    res.status(500);
    res.send(template(parsingErrAlert.msg, parsingErrAlert.link));
    console.log(produce.parsingErr);
    console.log("DCS 데이터 파싱 실패");
  }
};

exports.responseValues = (req, res) => {
  if (!produce.parsingErr) {
    res.status(201);
    res.json(util.successTrue(produce.values));
  } else {
    res.status(500);
    res.send(template(parsingErrAlert.msg, parsingErrAlert.link));
    console.log(produce.parsingErr);
    console.log("[Fs] DCS 데이터 파싱 실패");
  }
};
