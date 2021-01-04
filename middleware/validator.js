const {check, oneOf,  sanitize, validationResult} = require('express-validator');
var util = require("../middleware/util");

exports.result = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        //res.status(422);
        //console.dir(err);
        err.errors.name = err.name
        
        // res.json(util.successFalse({
        //     name: 'ValidationError',
        //     errors: err.errors //에러가 ID에서만 나면 [0], password까지 나면 [1]까지 배열 출력
        // }));


        req.valErr = util.successFalse({
            name: 'ValidationError',
            errors: err.errors //에러가 ID에서만 나면 [0], password까지 나면 [1]까지 배열 출력
        })
        next();
    }
    else next();
}

// req.check("password", "...").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");

exports.id = [
    check('id') // req.body, req.cookies, req.headers
    // req.params, req.query에 user_id라는 속성이 있는지 검사
        .custom(value => !/\s/.test(value))
        .withMessage('ID에 공백은 허용하지 않습니다.')
        .bail()
        .not() // 만약
        .isEmpty() // 빈값(""빈스트링, null, undefined)이라면
        .withMessage('ID를 입력해주세요.')//패러미터에 들어있는 스트링을 msg에 담아 응답
        .bail()//위의 조건에 해당하면 아래에 있는 유효성 검사는 하지 않음
        .isAlphanumeric() // 영문 || 숫자 || 영문 + 숫자인가?
        .withMessage('ID는 영문 또는 숫자 값만 허용됩니다.')
        .bail()
        .isLength({ min: 5 }) // String의 길이가 6 이상인가?
        .withMessage('ID는 5자리 이상입니다.')
        .trim() // 해당 값에 공백이 있으면 없애고 붙힘
        .escape() //  <,>, &, ', "및 /를 해당 HTML 엔티티로 대체한다.
]

exports.password = [
    check('password')
        .custom(value => !/\s/.test(value))
        .withMessage('비밀번호에 공백은 허용하지 않습니다.')
        .bail()
        .not()
        .isEmpty()
        .withMessage('비밀번호를 입력해주세요.')
        .bail()
        .isAlphanumeric()
        .withMessage('비밀번호는 영문 또는 숫자 값만 허용됩니다.')
        .bail()
        .isLength({ min: 6 })
        .withMessage('비밀번호는 6자리 이상입니다.')
        .trim()
        .escape()
]

exports.confirm = [
    check('confirm')
        .custom(value => !/\s/.test(value))
        .withMessage('비밀번호 확인에 공백은 허용하지 않습니다.')
        .bail()
        .not()
        .isEmpty()
        .withMessage('비밀번호 확인을 입력해주세요.')
        .bail()
        .isAlphanumeric()
        .withMessage('비밀번호 확인는 영문 또는 숫자 값만 허용됩니다.')
        .bail()
        .isLength({ min: 6 })
        .withMessage('비밀번호 확인는 6자리 이상입니다.')
        .trim()
        .escape()
]


exports.title = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('제목을 입력해주세요.')
        .escape()
]

exports.contents = [
    check('contents')
        .not()
        .isEmpty()
        .withMessage('내용을 입력해주세요.')
        .escape()
]

exports.noticeNum = [
    check('noticeNum')
        .not()
        .isEmpty()
        .withMessage('공지 번호를 입력해주세요.')
        .bail()
        .isNumeric()
        .withMessage('공지 번호는 숫자 값만 허용됩니다.')
        .escape()
]

exports.pageNum = [
    check('pageNum')
        .not()
        .isEmpty()
        .withMessage('페이지 번호를 입력해주세요.')
        .bail()
        .isNumeric()
        .withMessage('페이지 번호는 숫자 값만 허용됩니다.')
        .escape()
]

exports.visitor = [
    check('visitor')
        .not()
        .isEmpty()
        .withMessage('방문자명을 입력해주세요.')
        .escape()
]

exports.sentence = [
    check('sentence')
        .not()
        .isEmpty()
        .withMessage('환영 문구를 입력해주세요.')
        .escape()
]

exports.safety = [
    check('zeroHazard')
        .not()
        .isEmpty()
        .withMessage('무재해 배수를 입력해주세요.')
        .bail()
        .isNumeric()
        .withMessage('무재해 배수는 숫자 값만 허용됩니다.')
        .escape(),
    check('startDate')
        .not()
        .isEmpty()
        .withMessage('시작 날짜를 입력해주세요.')
        .bail()
        .custom(value => /^(19|20)\d{2}년\s(0[1-9]|1[012])월\s(0[1-9]|[12][0-9]|3[0-1])일$/.test(value))
        .withMessage('시작 날짜 값이 올바르지 않습니다.')
        .bail()
        .escape(),
    check('targetDate')
        .not()
        .isEmpty() 
        .withMessage('목표 날짜를 입력해주세요.')
        .bail()
        .custom(value => /^(19|20)\d{2}년\s(0[1-9]|1[012])월\s(0[1-9]|[12][0-9]|3[0-1])일$/.test(value))
        .withMessage('목표 날짜 값이 올바르지 않습니다.')
        .escape()
]

exports.uploadWorker = [
    check('dep')
        .not()
        .isEmpty()
        .withMessage('부서를 입력해주세요.')
        .bail()
        .custom(value => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+$/.test(value))
        .withMessage('부서명은 한글, 영어 대소문자, 숫자 값만 허용됩니다.')
        .isLength({ max: 8 })
        .withMessage('부서명은 최대 10자 입니다.')
        .escape(),
    check('rank')
        .not()
        .isEmpty()
        .withMessage('직급을 입력해주세요.')
        .bail()
        .custom(value => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+$/.test(value))
        .withMessage('직급명은 한글, 영어 대소문자, 숫자 값만 허용됩니다.')
        .isLength({ max: 16 })
        .withMessage('직급은 최대 10자 입니다.')
        .escape(),
    check('name')
        .not()
        .isEmpty()
        .withMessage('이름을 입력해주세요.')
        .bail()
        .custom(value => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+$/.test(value))
        .withMessage('이름은 한글, 영어 대소문자, 숫자 값만 허용됩니다.')
        .isLength({ max: 16 })
        .withMessage('이름은 최대 10자 입니다.')
        .escape(),
]

exports.inputWorker = [
    oneOf([
        check('leader')
            .not()
            .isEmpty()
            .withMessage('근무자를 선택해주세요.')
            .bail()
            .custom(value => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+.[a-z|A-Z]+$/.test(value))
            .withMessage('근무자 정보가 올바르지 않습니다.')
            .escape(),
        check('staff1')
            .not()
            .isEmpty()
            .withMessage('근무자를 선택해주세요.')
            .bail()
            .custom(value => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+.[a-z|A-Z]+$/.test(value))
            .withMessage('근무자 정보가 올바르지 않습니다.')
            .escape(),
        check('staff2')
            .not()
            .isEmpty()
            .withMessage('근무자를 선택해주세요.')
            .bail()
            .custom(value => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+.[a-z|A-Z]+$/.test(value))
            .withMessage('근무자 정보가 올바르지 않습니다.')
            .escape(),
        check('staff3')
            .not()
            .isEmpty()
            .withMessage('근무자를 선택해주세요.')
            .bail()
            .custom(value => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+.[a-z|A-Z]+$/.test(value))
            .withMessage('근무자 정보가 올바르지 않습니다.')
            .escape()
    ])
]

exports.deleteWorker = [
    check('dStaff')
        .not()
        .isEmpty()
        .withMessage('삭제할 근무자를 선택해주세요.')
        .bail()
        .custom(value => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+.[a-z|A-Z]+$/.test(value))
        .withMessage('근무자 정보가 올바르지 않습니다.')
        .escape()
]

exports.checks = [
    oneOf([
        check('check1')
            .not()
            .isEmpty()
            .withMessage('개별 슬라이드 순서 체크 값이 비어있습니다.')
            .bail()
            .isNumeric()
            .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
            .escape(),
        check('check2')
            .not()
            .isEmpty()
            .withMessage('개별 슬라이드 순서 체크 값이 비어있습니다.')
            .bail()
            .isNumeric()
            .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
            .escape()
    ])
]

// exports.check2 = [
//     check('check2')
//         .not()
//         .isEmpty()
//         .withMessage('개별 슬라이드 순서 체크 값이 공백입니다.')
//         .bail()
//         .isNumeric()
//         .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
//         .escape()
// ]

// exports.check3 = [
//     check('check3')
//         .not()
//         .isEmpty()
//         .withMessage('개별 슬라이드 순서 체크 값이 공백입니다.')
//         .bail()
//         .isNumeric()
//         .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
//         .escape()
// ]

// exports.check4 = [
//     check('check4')
//         .not()
//         .isEmpty()
//         .withMessage('개별 슬라이드 순서 체크 값이 공백입니다.')
//         .bail()
//         .isNumeric()
//         .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
//         .escape()
// ]

// exports.check5 = [
//     check('check5')
//         .not()
//         .isEmpty()
//         .withMessage('개별 슬라이드 순서 체크 값이 공백입니다.')
//         .bail()
//         .isNumeric()
//         .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
//         .escape()
// ]

// exports.check6 = [
//     check('check6')
//         .not()
//         .isEmpty()
//         .withMessage('개별 슬라이드 순서 체크 값이 공백입니다.')
//         .bail()
//         .isNumeric()
//         .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
//         .escape()
// ]

// exports.check7 = [
//     check('check7')
//         .not()
//         .isEmpty()
//         .withMessage('개별 슬라이드 순서 체크 값이 공백입니다.')
//         .bail()
//         .isNumeric()
//         .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
//         .escape()
// ]

// exports.check8 = [
//     check('check8')
//         .not()
//         .isEmpty()
//         .withMessage('개별 슬라이드 순서 체크 값이 공백입니다.')
//         .bail()
//         .isNumeric()
//         .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
//         .escape()
// ]

// exports.check9 = 
//     if()
// [
//     check('check9')

//         .not()
//         .isEmpty()
//         .withMessage('개별 슬라이드 순서 체크 값이 공백입니다.')
//         .bail()
//         .isNumeric()
//         .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
//         .escape()
// ]

exports.checkResult = [
    check('checkResult')
        .not()
        .isEmpty()
        .withMessage('전체 슬라이드 순서 체크 값이 공백입니다.')
        .bail()
        .custom(value => /^[0-9|,]+$/.test(value))
        .withMessage('전체 슬라이드 순서 값은 숫자와 콤마 값만 허용됩니다.')
        .escape()
]

exports.inputLotation = [
    check(['sHour', 'sMinute', 'sSecond'])
        .custom(value => /^[0-9|]+$/.test(value))
        .withMessage('슬라이드 순환 시간은 숫자 값만 가능합니다. (필요 없는 단위는 0 입력)')
        .isFloat({ min:0, max: 60 })
        .withMessage('최대 60까지 입력 가능합니다.')
        .escape()
]

exports.inputNews = [
    check(['nHour', 'nMinute', 'nSecond'])
        .custom(value => /^[0-9|]+$/.test(value))
        .withMessage('뉴스탭 순환 시간은 숫자 값만 가능합니다. (필요 없는 단위는 0 입력)')
        .isFloat({ min:0, max: 60 })
        .withMessage('최대 60까지 입력 가능합니다.')
        .escape()
]

