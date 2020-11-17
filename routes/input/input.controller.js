//controller.js : api 동작 코드

const util = require('../../middleware/util');
const figures = require('../../models/figures.json');
const multer = require('multer');
const upload = multer({dest: '../../figures'}); // 업로드 경로 설정

exports.inputFigures = (req, res) => {
    console.log('called inputFigures');
    res.render('../views/input.html');
}

exports.parsingFigures = (req, res) => {
    console.log('called parsingFigures');
    let figureFile = req.file;
    console.log(figureFile);
}

//window.onload = function(){} 함수는 웹브라우저의 모든 구성요소에 대한 로드가 끝났을 때 브라우저에 의해서 호출되는 함수
// window.onload = function () {
//     const input = document.querySelector('#file_uploads');
//     const preview = document.querySelector('#preview');

//     //input에 'change' 이벤트가 발생(파일 선택)되면 showTextFile 함수를 실행
//     input.addEventListener('change', function () {
//         const selectedFiles = input.files;
//         const list = document.createElement('ul');
//         preview.appendChild(list);


//         // 선택된 파일 목록에서 파일을 하나씩 꺼내온다.
//         for (const file of selectedFiles) {
//             const listItem = document.createElement('li');

//             if (validFileType(file)) {
//                 const textContents = document.createElement('div');
//                 let reader = new FileReader();
//                 reader.onload = function () {
//                     textContents.innerText = reader.result;
//                 };
//                 reader.readAsText(file, "UTF-8");
//                 listItem.appendChild(textContents);
//             } else {
//                 const message = document.createElement('div');
//                 message.textContent = `파일명 ${file.name}: .txt 파일을 선택하세요`;
//                 listItem.appendChild(message);
//             }
//             list.appendChild(listItem);
//         }
//     });

//     const fileTypes = [
//         'text/plain',
//     ];

//     function validFileType(file) {
//         return fileTypes.includes(file.type);
//     }
// }