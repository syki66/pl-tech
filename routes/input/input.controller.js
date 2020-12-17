const fs = require("fs");
const Iconv = require("iconv").Iconv;
const values = require("../../value/values");
const adminController = require("../admin/admin.controller");
const DCSPath = "DCS_val.csv";

let parsing = null;

const parsingValues = (path, callback) => {
  let encode = new Iconv("euc-kr", "utf-8"); // csv 파일을 그냥 읽어오면 한글이 깨지기 때문에 인코딩 필요

  fs.readFile(path, async (err, data) => {
    if (err) {
      console.dir(err);
      console.log("파일 읽기 실패.\n");
      callback(err, null);
    } else {
      console.log("파일 읽기 성공.");

      let content = encode.convert(data); // euc-kr => utf-8로 컨버팅
      data = content.toString("utf-8"); // 컨버팅 데이터 utf-8 문자열로 변환

      parsing = data.split("\r\n"); // 행으로 나누어줌

      for (let i = 0; i < parsing.length; ++i) {
        if (parsing[i][0] === "*") {
          parsing[i] = await removeSpecial(parsing[i]);
        } else {
          parsing[i] = await removeSpecial(parsing[i]);
        }
      }

      for (let i = 0; i < parsing.length; ++i) {
        if (parsing[i] == "") {
          parsing.splice(i, 1);
        }
      }

      for (let i = 0; i < parsing.length; ++i) {
        parsing[i] = parsing[i].split(",");
        for (let j = 0; j < parsing[i].length; ++j) {
          let val = parsing[i][j];
          if (!(await testLetters(val)))
            parsing[i][j] = numberWithCommas(parsing[i][j]);
        }
      }

      for (let i = 0; i < parsing.length; ++i) {
        console.log("parsed " + i);
        console.log(parsing[i]);
      }

      let result = values.valuesToJson(parsing, adminController.welcomeObj);

      callback(null, result);
    }
  });
};

exports.updateWelcome = () => {
  exports.parsed = values.valuesToJson(parsing, adminController.welcomeObj);
  console.log(this.parsed);
};

const removeLetters = (str) => {
  return new Promise((resolve, reject) => {
    try {
      let kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g; // 한글 정규식
      let eng = /[a-zA-Z]/g;
      str = str.replace(kor, ""); // 한글 제거
      str = str.replace(eng, ""); // 한글 제거
      resolve(str);
    } catch (error) {
      reject(error);
    }
  });
};

const testLetters = (str) => {
  return new Promise((resolve, reject) => {
    try {
      let kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g; // 한글 정규식
      let eng = /[a-zA-Z]/g;
      resolve(kor.test(str) || eng.test(str));
    } catch (error) {
      reject(error);
    }
  });
};

const removeSpecial = (str) => {
  return new Promise((resolve, reject) => {
    try {
      let i;
      for (i = 0; i < str.length; ++i) {
        let special = /[\{\}\[\]\/?.,;:|\)~`!^\_+<>@\#$%&\\\=\(\'\"]/gi; // 특수문자 정규식
        if (!special.test(str[i])) break;
      }

      str = str.substring(i, str.length);
      for (i = str.length - 1; i >= 0; --i) {
        let special = /[\{\}\[\]\/?.,;:|\)~`!^\_+<>@\#$%&\\\=\(\'\"]/gi; // 특수문자 정규식
        if (!special.test(str[i])) break;
      }

      str = str.substring(0, i + 1);

      resolve(str);
    } catch (error) {
      reject(error);
    }
  });
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

parsingValues(DCSPath, (err, data) => {
  exports.parsed = data;
});

(async () => {
  // 파일 수정시 읽어오기, 상시 동작
  fs.watchFile(DCSPath, (curr, prev) => {
    console.log("File modification detected.");
    parsingValues(DCSPath, (err, data) => {
      exports.parsed = data;
    });
  });
})();

// module.exports = parsingValues;
