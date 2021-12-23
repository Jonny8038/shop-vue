import {
    login,
    register,
    getuseinfo,
    updatauserinfo,
    getallusers
} from '@/api/user'



const user = {
    state: {
        token: sessionStorage.getItem('token'),
        phone: sessionStorage.getItem('phone'),
        submit_data: {},
        userinfo: {},
        allusers: []
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            sessionStorage.setItem('token', token)
        },
        set_phone(state, phone) {
            state.phone = phone
            sessionStorage.setItem('phone', phone)
        },
        set_submit_info(state, data) {
            state.submit_data = data
        },
        set_userinfo(state, userinfo) {
            state.userinfo = userinfo
            sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
        },
        set_allusers(state, allusers) {
            state.allusers = allusers
        }
    },
    actions: {
       
        //注册
        Register({
            commit
        }, userinfo) {
            const phone = userinfo.phone
            const pwd = userinfo.pwd
            return new Promise((resolve, reject) => {
                register(phone, pwd).then(res => {
                    commit('set_submit_info', res.data)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },

        //获取用户信息
        Getuserinfo({
            commit
        }, phone) {
            return new Promise((resolve, reject) => {
                getuseinfo(phone).then(res => {
                    commit('set_userinfo', res.data.data)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}

export default user