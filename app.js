const express = require("express");
const http = require("http");
const https = require("https");
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const util = require("./middleware/util");
const methodOverride = require("method-override");

var app = express();

const routes = require("./routes");

const models = require("./models");

models.sequelize
  .sync()
  .then(function () {
    console.log("DB에 연결되었습니다.");
  })
  .catch(function (err) {
    console.error(err);
    console.log("DB connection error. Please make sure DB is running");
    process.exit();
  });

//environment
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

//setting engine
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
//이 코드는 /views 폴더 안에 있는 파일들을 클라이언트에서 바로 접근할 수 있게 합니다.
app.use("/", express.static(path.join(__dirname, "/")));

let ip = "localhost";
axios.defaults.baseURL = ip;

//router setting
app.use("/", routes);

app.use(function (req, res, next) {
  res.status(404);
  res.json(
    util.successFalse(
      {
        name: "404 Not Found",
      },
      "404 Not Found"
    )
  );
});

let server = http.createServer(app);

//single thread server
server.listen(app.get("port"), ip, function () {
  console.log("ip : " + ip + " | port : " + app.get("port"));
  console.log("server is running");
});

server.on("connection", function (socket) {});
