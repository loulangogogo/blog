import axios from "axios";
import request from "./request";
import response from './response';
import requestError from "./requestError";
import responseError from "./responseError";

// 创建请求并进行配置
const ask = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    timeout: 60000
});

// 请求拦截器
ask.interceptors.request.use(request,requestError);

// 响应拦截器 (响应不是2xx得就会进入错误请求方法内)
ask.interceptors.response.use(response,responseError);

export default ask;
