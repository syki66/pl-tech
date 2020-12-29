const fs = require("fs");
const Iconv = require("iconv").Iconv;
const values = require("../../values/slide");
const objects = require("../../values/objects");
const adminController = require("../admin/admin.controller");
const DCSPath = "DCS_val.csv";
const models = require("../../models");

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

      objects.parsedObj = data.split("\r\n"); // 행으로 나누어줌

      for (let i = 0; i < objects.parsedObj.length; ++i) {
        if (objects.parsedObj[i][0] === "*") {
          objects.parsedObj[i] = await removeSpecial(objects.parsedObj[i]);
        } else {
          objects.parsedObj[i] = await removeSpecial(objects.parsedObj[i]);
        }
      }

      for (let i = 0; i < objects.parsedObj.length; ++i) {
        if (objects.parsedObj[i] == "") {
          objects.parsedObj.splice(i, 1);
        }
      }

      for (let i = 0; i < objects.parsedObj.length; ++i) {
        objects.parsedObj[i] = objects.parsedObj[i].split(",");
        for (let j = 0; j < objects.parsedObj[i].length; ++j) {
          let val = objects.parsedObj[i][j];
          if (!(await testLetters(val)))
            objects.parsedObj[i][j] = numberWithCommas(objects.parsedObj[i][j]);
        }
      }

      let result;
      models.Notice.findAll({
        attributes: ["id", "title", "cdate"],
        raw: true,
        order: [["id", "DESC"]],
        limit: 5,
      })
        .then((data) => {
          // console.log(data);
          for (let i = 0; i < data.length; i++) {
            let cdate =
              data[i].cdate.substring(5, 7) +
              "/" +
              data[i].cdate.substring(8, 10);
            let day = data[i].cdate.substring(11, 12);
            const row = [cdate, day, data[i].title, String(data[i].id)];
            this.noticeObj[i] = row;
          }
          result = values.valuesToJson(
            objects.parsedObj,
            objects.welcomeObj,
            objects.noticeObj,
            objects.safetyObj,
            objects.workerObj
          );
          callback(null, result);
        })
        .catch((err) => {
          console.log(err);
          res.json(util.successFalse(err));
        });
    }
  });
};

// 글 생성 및 삭제시 업데이트
exports.updateNoticeObj = () => {
  models.Notice.findAll({
    attributes: ["id", "title", "cdate"],
    raw: true,
    order: [["id", "DESC"]],
    limit: 5,
  })
    .then((data) => {
      console.log(data);
      let row;
      for (let i = 0; i < objects.noticeObj.length; i++) {
        if (data[i]) {
          let cdate =
            data[i].cdate.substring(5, 7) +
            "/" +
            data[i].cdate.substring(8, 10);
          let day = data[i].cdate.substring(11, 12);
          row = [cdate, day, data[i].title, String(data[i].id)];
        } else {
          row = null;
        }
        objects.noticeObj[i] = row;
        exports.parsed = values.valuesToJson(
          objects.parsedObj,
          objects.welcomeObj,
          objects.noticeObj,
          objects.safetyObj,
          objects.workerObj,
          objects.slideObj
        );
      }
    })
    .catch((err) => {
      console.log(err);
      res.json(util.successFalse(err));
    });
};

exports.updateInputData = () => {
  exports.parsed = values.valuesToJson(
    objects.parsedObj,
    objects.welcomeObj,
    objects.noticeObj,
    objects.safetyObj,
    objects.workerObj,
    objects.slideObj
  );
  // console.log(this.parsed);
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
