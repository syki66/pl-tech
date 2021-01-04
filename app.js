const express = require("express");
const http = require("http");
const https = require("https");
const fs = require('fs');
const options = {
	key: fs.readFileSync('./keys/private.pem'),
	cert: fs.readFileSync('./keys/public.pem')
};
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const util = require("./middleware/util");
const methodOverride = require("method-override");

let app = express(); //https
let httpApp = express();

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

//http environment
httpApp.set("port", process.env.PORT || 80);
httpApp.get("*", function (req, res, next) {
  res.redirect("https://" + req.headers.host + req.path);
});

//https environment
app.set("port", process.env.PORT || 443);
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

// app.use (function (req, res, next) {
//   if (req.secure) {
//           // request was via https, so do no special handling
//           next();
//   } else {
//           // request was via http, so redirect to https
//           res.redirect('https://' + req.headers.host + req.url);
//   }
// });

// app.get('*', function(req, res) {  
//   res.redirect('https://' + req.headers.host + req.url);
//   console.log(req.url);
//   // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//   // res.redirect('https://example.com' + req.url);
// })

// app.all('*', (req, res, next) => {
//   let protocol = req.headers['x-forwarded-proto'] || req.protocol;
//   if (protocol == 'https'){
//       next();
//   } else {
//       let from = `${protocol}://${req.hostname}${req.url}`; 
//       let to = `https://${req.hostname}${req.url}`;
//       // log and redirect 
//       console.log(`[${req.method}]: ${from} -> ${to}`);
//       res.redirect(to);
//   }
// })

http.createServer(httpApp).listen(httpApp.get("port"), ip, function () {
  console.log("ip : " + ip + " | port : " + httpApp.get("port"));
  console.log("HTTP server is running");
});

https.createServer(options, app).listen(app.get("port"), ip, function () {
  console.log("ip : " + ip + " | port : " + app.get("port"));
  console.log("HTTPS server is running");
});

