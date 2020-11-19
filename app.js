const express = require('express');
const http = require('http');
const fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const util = require('./middleware/util');
const model = require('./models/figures');
const inputController = require('./routes/input/input.controller');

const app = express();

const routes = require('./routes');

//environment
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//setting engine
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
//이 코드는 /views 폴더 안에 있는 파일들을 클라이언트에서 바로 접근할 수 있게 합니다.
// app.use('/', static(path.join(__dirname, 'views')));

let ip = 'localhost';

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
    console.log('ip : ' + ip + ' | port : ' + app.get('port'));
    console.log('server is running');
});

server.on('connection', function (socket) {
    console.log('클라이언트가 접속했습니다.');
});

const figurePath = 'figures.txt'

fs.watchFile(figurePath, (curr, prev) => {
    const body = { filepath: figurePath }; // post 요청 시 보내는 body 라고 가정
    const header = {
        "accept": 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'ko- KR, ko; q = 0.9, en - US; q = 0.8, en; q = 0.7',
        'Cache-Control': 'max-age=0',
        "Connection": 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Referer': 'http://https://localhost/input/2',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
      }
    let link = 'https://localhost/input/2'
    axios({
        address: '192.168.0.2',
        url: link,
        port: 3000,
        headers : header,
        method: "POST",
        data: body
    })
    .then(response => {
       console.log(response);
       console.log('watchFile success');
    })
    .catch(err => {
        console.log(err);
        console.log('watchFile error');
    });
});