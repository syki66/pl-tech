const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// 세션 생성

// maxAge - 세션 만료 시간 ex) 초*1000
// chearExpired - 만료된 세션 삭제
// checkExpirationInterval - 만료된 세션 삭제 주기 ex) 초*1000
exports.sess = {
  secret: "pltech key",
  cookie:{maxAge : 1*60*60*1000},
  resave: false,
  saveUninitialized: true,
  httpOnly: true,
  secure: true,
  store: new MySQLStore({
    host: "localhost",
    port: 3306,
    user: "root",
<<<<<<< HEAD
    password: "rkawk35088",
=======
    password: "1028",
>>>>>>> 7fdd4546d23b36830646daebf8e62c892f4b9a87
    database: "pltech",
    clearExpired: true,
    checkExpirationInterval: 2*60*60*1000
  }),
  rolling : true
};


