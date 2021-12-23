import server from '@/http/index'

export function login(phone, pwd) { //登录
    return server({
        url: '/login',
        method: 'post',
        data: {
            phone,
            pwd
        }
    })
}

export function register(phone, pwd) { //注册
    return server({
        url: '/register',
        method: 'post',
        data: {
            phone,
            pwd
        }
    })
}

export function getuseinfo(phone) { //获取用户信息
    return server({
        url: '/findUserinfo',
        method: "post",
        data: {
            phone
        }
    })
}

export function updatauserinfo(userinfo) { //更新用户信息
    return server({
        url: "/updataUserinfo",
        method: 'post',
        data: {
            phone: userinfo.phone,
            userinfo
        }
    })
}

export function getallusers(userinfo) { //获取所有用户信息
    return server({
        url: '/findAllusers',
        method: 'get',
        params: {
            userinfo
        }
    })
}

export function deleteUser(phone) { //删除用户
    console.log(phone);
    return server({
        url: '/deleteUser',
        method: 'post',
        data: {
            phone,
        }
    })
}