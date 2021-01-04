const {check, oneOf,  sanitize, validationResult} = require('express-validator');
var util = require("../middleware/util");

exports.result = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        err.errors.name = err.name
        req.valErr = util.successFalse({
            name: 'ValidationError',
            errors: err.errors //에러가 ID에서만 나면 [0], password까지 나면 [1]까지 배열 출력
        })
    }
    next();
}

// req.check("password", "...").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");

const regexSpace = /\s/;
const regexDate = /^(19|20)\d{2}년\s(0[1-9]|1[012])월\s(0[1-9]|[12][0-9]|3[0-1])일$/;
const regexDRN = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+$/;
const regexWorker = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+-[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+.[a-z|A-Z|0-9]+$/;
const regexCheckResult = /^([1-9]{1},)+[1-9]{1}$/;
const regexMinuteSecond = /^([0-9]|[1-5][0-9])$/;
const regexHour = /^([0-9]|1[0-9]|2[0-4])$/;


exports.id = [
    check('id') // req.body, req.cookies, req.headers
    // req.params, req.query에 user_id라는 속성이 있는지 검사
        .not() // 만약
        .isEmpty() // 빈값(""빈스트링, null, undefined)이라면
        .withMessage('ID를 입력해주세요.')//패러미터에 들어있는 스트링을 msg에 담아 응답
        .bail()//위의 조건에 해당하면 아래에 있는 유효성 검사는 하지 않음
        .custom(value => !regexSpace.test(value))
        .withMessage('ID에 공백은 허용되지 않습니다.')
        .bail()
        .isAlphanumeric() // 영문 || 숫자 || 영문 + 숫자인가?
        .withMessage('ID는 영문 또는 숫자 값만 허용됩니다.')
        .bail()
        .isLength({ min: 6 }) // String의 길이가 6 이상인가?
        .withMessage('ID는 최소 6자 이상입니다.')
        .bail()
        .isLength({ max: 20 })
        .withMessage('ID는 최대 20자 까지입니다.')
        .trim() // 해당 값에 공백이 있으면 없애고 붙힘
        .escape() //  <,>, &, ', "및 /를 해당 HTML 엔티티로 대체한다.
]

exports.password = [
    check('password')
        .not()
        .isEmpty()
        .withMessage('비밀번호를 입력해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('비밀번호에 공백은 허용되지 않습니다.')
        .bail()
        .isAlphanumeric()
        .withMessage('비밀번호는 영문 또는 숫자 값만 허용됩니다.')
        .bail()
        .isLength({ min: 6 })
        .withMessage('비밀번호는 최소 6자 이상입니다.')
        .bail()
        .isLength({ max: 20 })
        .withMessage('비밀번호는 최대 20자 까지입니다.')
        .trim()
        .escape()
]

exports.confirm = [
    check('confirm')
        .not()
        .isEmpty()
        .withMessage('비밀번호 확인을 입력해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('비밀번호 확인에 공백은 허용되지 않습니다.')
        .bail()
        .isAlphanumeric()
        .withMessage('비밀번호 확인는 영문 또는 숫자 값만 허용됩니다.')
        .bail()
        .isLength({ min: 6 })
        .withMessage('비밀번호 확인은 최소 6자리 이상입니다.')
        .trim()
        .escape()
]

exports.title = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('제목을 입력해주세요.')
        .bail()
        .isLength({ max: 50 })
        .withMessage('제목은 50자 이하로 작성해주세요.')
        .escape()
]

exports.contents = [
    check('contents')
        .not()
        .isEmpty()
        .withMessage('내용을 입력해주세요.')
        .bail()
        .isLength({ max: 5000 })
        .withMessage('내용은 5000자 이하로 작성해주세요.')
        .escape()
]

exports.noticeNum = [
    check('noticeNum')
        .not()
        .isEmpty()
        .withMessage('공지 번호를 입력해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('공지 번호에 공백은 허용되지 않습니다.')
        .bail()
        .isNumeric()
        .withMessage('공지 번호는 숫자 값만 허용됩니다.')
        .trim()
        .escape()
]

exports.pageNum = [
    check('pageNum')
        .not()
        .isEmpty()
        .withMessage('페이지 번호를 입력해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('페이지 번호에 공백은 허용되지 않습니다.')
        .bail()
        .isNumeric()
        .withMessage('페이지 번호는 숫자 값만 허용됩니다.')
        .trim()
        .escape()
]

exports.visitor = [
    check('visitor')
        .not()
        .isEmpty()
        .withMessage('방문자명을 입력해주세요.')
        .bail()
        .isLength({ max: 16 })
        .withMessage('방문자명은 8자 이하로 작성해주세요.')
        .escape()
]

exports.sentence = [
    check('sentence')
        .not()
        .isEmpty()
        .withMessage('환영문구를 입력해주세요.')
        .bail()
        .isLength({ max: 72 })
        .withMessage('환영문구는 36자 이하로 작성해주세요.')
        .escape()
]

exports.safety = [
    check('zeroHazard')
        .not()
        .isEmpty()
        .withMessage('무재해 배수를 입력해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('무재해 배수에 공백은 허용되지 않습니다.')
        .bail()
        .isNumeric()
        .withMessage('무재해 배수는 숫자 값만 허용됩니다.')
        .bail()
        .isLength({ max: 2 })
        .withMessage('무재해 배수는 두 자릿수 이하로 작성해주세요. (0 ~ 99)')
        .trim()
        .escape(),
    check('startDate')
        .not()
        .isEmpty()
        .withMessage('시작 날짜를 입력해주세요.')
        .bail()
        .custom(value => regexDate.test(value))
        .withMessage('시작 날짜 값 형식(YYYY년 MM월 DD일)이 올바르지 않습니다.')
        .bail()
        .escape(),
    check('targetDate')
        .not()
        .isEmpty() 
        .withMessage('목표 날짜를 입력해주세요.')
        .bail()
        .custom(value => regexDate.test(value))
        .withMessage('목표 날짜 값 형식(YYYY년 MM월 DD일)이 올바르지 않습니다.')
        .escape()
]

exports.uploadWorker = [
    check('dep')
        .not()
        .isEmpty()
        .withMessage('부서를 입력해주세요.')
        .bail()
        .custom(value => regexDRN.test(value))
        .withMessage('부서명은 한글, 영어 대소문자, 숫자 값만 허용됩니다.')
        .isLength({ max: 10 })
        .withMessage('부서명은 최대 10자 입니다.')
        .escape(),
    check('rank')
        .not()
        .isEmpty()
        .withMessage('직급을 입력해주세요.')
        .bail()
        .custom(value => regexDRN.test(value))
        .withMessage('직급명은 한글, 영어 대소문자, 숫자 값만 허용됩니다.')
        .isLength({ max: 10 })
        .withMessage('직급은 최대 10자 입니다.')
        .escape(),
    check('name')
        .not()
        .isEmpty()
        .withMessage('이름을 입력해주세요.')
        .bail()
        .custom(value => regexDRN.test(value))
        .withMessage('이름은 한글, 영어 대소문자, 숫자 값만 허용됩니다.')
        .isLength({ max: 10 })
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
            .custom(value => regexWorker.test(value))
            .withMessage('근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.')
            .escape(),
        check('staff1')
            .not()
            .isEmpty()
            .withMessage('근무자를 선택해주세요.')
            .bail()
            .custom(value => regexWorker.test(value))
            .withMessage('근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.')
            .escape(),
        check('staff2')
            .not()
            .isEmpty()
            .withMessage('근무자를 선택해주세요.')
            .bail()
            .custom(value => regexWorker.test(value))
            .withMessage('근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.')
            .escape(),
        check('staff3')
            .not()
            .isEmpty()
            .withMessage('근무자를 선택해주세요.')
            .bail()
            .custom(value => regexWorker.test(value))
            .withMessage('근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.')
            .escape()
    ])
]

exports.deleteWorker = [
    check('dStaff')
        .not()
        .isEmpty()
        .withMessage('삭제할 근무자를 선택해주세요.')
        .bail()
        .custom(value => regexWorker.test(value))
        .withMessage('근무자 정보 형식(부서-직급-이름)이 올바르지 않습니다.')
        .escape()
]

exports.checks = [
    check(['check1', 'check2', 'check3', 'check4', 'check5', 'check6', 'check7', 'check8', 'check9'])
        // check n이 존재하지 않아도 무시
        .optional({ checkFalsy: true })
        .custom(value => !regexSpace.test(value))
        .withMessage('개별 슬라이드 순서 체크 값에 공백은 허용되지 않습니다.')
        .bail()
        .isNumeric()
        .withMessage('개별 슬라이드 순서 체크 값은 숫자 값만 허용됩니다.')
        .trim()
        .escape()
]

exports.checkResult = [
    check('checkResult')
        .not()
        .isEmpty()
        .withMessage('슬라이드 순서를 체크박스로 지정해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('전체 슬라이드 순서 값에 공백은 허용되지 않습니다.')
        .bail()
        .custom(value => regexCheckResult.test(value))
        .withMessage('전체 슬라이드 순서 값은 숫자와 콤마 값만 허용됩니다.')
        .trim()
        .escape()
]

exports.inputLotation = [
    check('sHour')
        .not()
        .isEmpty()
        .withMessage('슬라이드 순환 시간을 빈칸에 입력해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('슬라이드 순환 시간 값에 공백은 허용되지 않습니다.')
        .bail()
        .custom(value => regexHour.test(value))
        .withMessage('슬라이드 순환 시간 시는 24 이하의 숫자 값만 허용됩니다. (0 ~ 24)')
        .trim()
        .escape(),
    check(['sMinute', 'sSecond'])
        .not()
        .isEmpty()
        .withMessage('슬라이드 순환 시간을 빈칸에 입력해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('슬라이드 순환 시간 값에 공백은 허용되지 않습니다.')
        .bail()
        .custom(value => regexMinuteSecond.test(value))
        .withMessage('슬라이드 순환 시간 분, 초는 59 이하의 숫자 값만 허용됩니다. (0 ~ 59)')
        .trim()
        .escape()
]

exports.inputNews = [
    check('nHour')
        .not()
        .isEmpty()
        .withMessage('뉴스탭 순환 시간을 빈칸에 입력해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('뉴스탭 순환 시간 값에 공백은 허용되지 않습니다.')
        .bail()
        .custom(value => regexHour.test(value))
        .withMessage('뉴스탭 순환 시간 시는 24 이하의 숫자 값만 허용됩니다. (0 ~ 24)')
        .trim()
        .escape(),
    check(['nMinute', 'nSecond'])
        .not()
        .isEmpty()
        .withMessage('뉴스탭 순환 시간을 빈칸에 입력해주세요.')
        .bail()
        .custom(value => !regexSpace.test(value))
        .withMessage('뉴스탭 순환 시간 값에 공백은 허용되지 않습니다.')
        .bail()
        .custom(value => regexMinuteSecond.test(value))
        .withMessage('뉴스탭 순환 시간 분, 초는 59 이하의 숫자 값만 허용됩니다. (0 ~ 59)')
        .trim()
        .escape()
]

