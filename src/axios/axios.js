import axios from 'axios'
import qs from 'qs'
import { Loading } from 'element-ui'

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8081/api';
let loading
//请求拦截器
axios.interceptors.request.use(config => {
	//POST传参序列化
	// if(config.method === 'post') {
	// 	config.data = qs.stringify(config.data);
	// }
	//请求显示加载动效
	loading = Loading.service({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
	return config;
},(error) => { 
    return Promise.reject(error);
});

//响应拦截器 返回状态判断
axios.interceptors.response.use(res =>{ 
	// if(!res.data.success) {
	// 	return Promise.reject(res);
	// }
	//响应关闭加载动效
	loading.close()
    return Promise.resolve(res);
}, (error) => { //404等问题可以在这里处理 
	return Promise.reject(error);
});

export function fetchGet(url, params) { 
	return new Promise((resolve, reject) => { 
		axios.get(url, {params: params})
		.then(response => {  
			resolve(response.data);   
		}, err => {  
		    console.log('err: ' + err)  
			reject(err);   
		})
		.catch((error) => {
			console.log('error: ' + error)
			reject(error)   
		})
	})
}

export function fetchPost(url, params) { 
	return new Promise((resolve, reject) => {  
		axios.post(url, params)
		.then(response => {    
			resolve(response.data);   
		}, err => {    
			reject(err);   
		})
		.catch((error) => {    
			reject(error)   
		})
	})
}


