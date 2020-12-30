const util = require("../../middleware/util");
const produce = require("../../values/produce");

exports.homepage = (req, res) => {
  res.status(200);
  res.render("../views/index.html");
};

exports.responseValues = (req, res) => {
  let values = produce.values;
  if (values === null || values === undefined) {
    const err = new Error("parsed data is not exist!");
    console.dir(err);
    console.log("파싱된 데이터가 존재하지 않습니다.\n");
    res.status(500);
    res.json(util.successFalse(err, "파싱된 데이터가 존재하지 않습니다."));
  } else {
    res.status(201);
    res.json(util.successTrue(values));
  }
};
