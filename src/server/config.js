/*
*  代理url
*/

import axios from 'axios'
import Qs from 'qs'

let baseUrl = ''

if (process.env.NODE_ENV == 'development') {
	  baseUrl = ''
} else {
	  baseUrl = '/api'
}


//请求前
axios.interceptors.request.use(
      config => {
				config.transformRequest = (data) => {
					//处理序列化参数  form-data 格式
					data = Qs.stringify(data);
					return data
				}
				config.withCredentials = true
          return config
      },
			(error) => {
          return Promise.reject(error)
      }
  );
//请求后
axios.interceptors.response.use( (response) => {
	if (response.data.do == "redirect") {
		window.location.href = response.data.url
	}else{
		if (response.status == '200') {
				return response.data;
		}
	}
},  (error) => {
	console.log(error,'error')
});

 export  {
	 baseUrl,
	 axios
}
