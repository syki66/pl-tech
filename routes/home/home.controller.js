const util = require("../../middleware/util");
const produce = require("../../values/produce");
const { parsingErrAlert } = require("../../values/alert");

exports.homepage = (req, res) => {
  res.status(200);
  res.render("../views/index.html");
};

exports.responseValues = (req, res) => {
  if (produce.values) {
    res.status(201);
    res.json(util.successTrue(produce.values));
  } else {
    const err = new Error("parsed data is not exist!");
    res.status(500);
    res.send(template(parsingErrAlert.msg, parsingErrAlert.link));
    console.log(err);
    console.log("파싱된 데이터가 존재하지 않습니다");
  }
};
