// GET - /auth/login 로그인 페이지
exports.alert = (req, res) => {
  res.status(201);
  res.render("../views/alert.html");
};
