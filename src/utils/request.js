import axios from 'axios';
import {Toast} from 'antd-mobile'
// create an axios instance
const Request = axios.create({
  baseURL: 'http://localhost:3000', // api 的 base_url
  timeout: 5000,
});
// const SECRECT = 'y8q6wjtz3j1emtbwqnhipjgkpynpvmhh'; // y8q6wjtz3j1emtbwqnhipjgkpynpvmhh
// request interceptor
Request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Do something with request error
    Toast.offline('网络请求错误')
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
Request.interceptors.response.use(
  // response => response.data,
  response => {
    const res = response.data;
    if (response.status !== 200 || res.code !== 0) {
      Toast.fail('获取数据存在错误')
      return res;
    } else {
      return res;
    }
  },
  error => {
    Toast.offline('网络请求错误, 请查看控制台')
    console.log('网络请求错误：' + error); // for debug
    return Promise.reject(error);
  }
);

export default Request;
