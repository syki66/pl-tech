const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//static 미들웨어는 특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 만들어줍니다. 
const static = require('serve-static');
const util = require('./middleware/util');

const app = express();

const routes = require('./routes');

//environment
app.set('port', process.env.PORT || 80);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//setting engine
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
//이 코드는 /views 폴더 안에 있는 파일들을 클라이언트에서 바로 접근할 수 있게 합니다.
// app.use('/', static(path.join(__dirname, 'views')));

let ip = '192.168.0.2';

//router setting
app.use('/', routes);

app.use(function (req, res, next) {
    res.status(404);
    res.json(util.successFalse({
        name: '404 Not Found'
    }, '404 Not Found'));
});

let server = http.createServer(app);


//single thread server
server.listen(app.get('port'), ip, function () {
    // console.log('ip : ' + ip + ' | port : ' + app.get('port'));
    console.log('server is running');
});

server.on('connection', function (socket) {
    console.log('클라이언트가 접속했습니다.');
});
