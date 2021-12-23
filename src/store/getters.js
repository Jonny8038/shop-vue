const getters = {
    token: state => state.user.token, //token
    phone: state => state.user.phone, //手机号
    userinfo: state => state.user.userinfo, //用户信息
    submit_data: state => state.user.submit_data   //登录注册返回的信息
}

export default getters