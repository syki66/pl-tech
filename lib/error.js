module.exports = {
    authErr:function() {
        return error = {
            name : 'AuthenticationError',
            msg : '로그인이 필요합니다.'
        }
    },

    createErr:function() {
        return error = {
            name : 'createError',
            msg : '공지를 생성할 수 없습니다.'
        }
    },

    updateErr:function() {
        return error = {
            name : 'updateError',
            msg : '공지를 수정할 수 없습니다.'
        }
    },

    deleteErr:function() {
        return error = {
            name : 'deleteError',
            msg : '공지를 삭제할 수 없습니다.'
        }
    },

    loadErr:function() {
        return error = {
            name : 'loadError',
            msg : '데이터를 불러올 수 없습니다.'
        }
    },

    pwErr:function() {
        return error = {
            name : 'passwordError',
            msg : '비밀번호가 일치하지 않습니다.'
        }
    },

    idErr:function() {
        return error = {
            name : 'idError',
            msg : '아이디가 존재하지 않습니다.'
        }
    },

    loginErr:function() {
        return error = {
            name : 'loginError',
            msg : '로그인에 실패했습니다.'
        }
    },

    registerErr:function() {
        return error = {
            name : 'registerError',
            msg : '관리자 등록에 실패했습니다.'
        }
    }
}