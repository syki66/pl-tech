const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// 세션 생성
exports.sess = {
  secret: "pltech key",
  cookie:{maxAge : 5*1000},
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rkawk35088",
    database: "pltech",
    clearExpired: true,
    checkExpirationInterval: 30*1000
  }),
  rolling : true
};
