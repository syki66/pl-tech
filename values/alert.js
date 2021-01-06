exports.authAlert = {
    msg : '로그인이 필요합니다.',
    link : '/auth/login'
};

exports.createAlert = {
    msg : '공지사항을 작성했습니다.',
    link : '/admin/notice/manage/1'
};

exports.createErrAlert = {
    msg : '공지사항 작성에 실패했습니다.',
    link : '/admin/notice'
};

exports.updateAlert = {
    msg : '공지사항을 수정했습니다.',
    link : '/admin/notice/manage/1'
};

exports.confirmAlert = {
    msg : '공지사항을 삭제하시겠습니까?',
    link : '/admin/delete'
};

exports.deleteAlert = {
    pnum : '',
    msg : '공지사항을 삭제했습니다.',
    link : `/admin/notice/manage/${this.pnum}` //?
};

exports.welcomeAlert = {
    msg : '환영문구가 슬라이드에 반영되었습니다.',
    link : '/admin/welcome'
}

exports.registerAlert = {
    msg : '관리자로 등록되었습니다.',
    link : '/auth/login'
}

exports.idErrAlert = {
    msg : '아이디가 존재하지 않습니다.',
    link : '/auth/login'
}

exports.passErrAlert = {
    msg : '비밀번호가 일치하지 않습니다.',
    link : '/auth/login'
}

exports.loginAlert = {
    msg : '관리자로 로그인했습니다.',
    link : '/admin'
}

exports.logoutAlert = {
    msg : '로그아웃했습니다.',
    link : '/auth/login'
}

exports.workerInputAlert = {
    msg : '근무자 현황이 적용되었습니다.',
    link : '/admin/worker'
}

exports.workerUploadAlert = {
    msg : '해당 데이터의 근무자를 추가했습니다.',
    link : '/admin/worker'
}

exports.workerDeleteAlert = {
    msg : '해당 데이터의 근무자를 삭제했습니다.',
    link : '/admin/worker'
}

exports.safetyAlert = {
    msg : '무재해 기록판 설정이 적용되었습니다.',
    link : '/admin/safety'
}

exports.slideAlert = {
    msg : '슬라이드 순서가 적용되었습니다.',
    link : '/admin/slide'
}

exports.lotationAlert = {
    msg : '슬라이드 순환 시간이 적용되었습니다.',
    link : '/admin/slide'
}

exports.newsAlert = {
    msg : '뉴스탭 순환 시간이 적용되었습니다.',
    link : '/admin/slide'
}