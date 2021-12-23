import axios from "axios";
import store from "../store";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

let server = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
})


//添加请求拦截器
server.interceptors.request.use(
    config => {
        let token = store.getters.token || ''
        if (token) {
            config.headers['Authorization'] = "Bearer " + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);



// response 拦截器
server.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response.data);
    }
);



export default server