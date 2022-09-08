
import axios from 'axios'

//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
//1、对axios二次封装
const requests = axios.create({
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    // baseURL:'/api',
    timeout: 5000,
})

//2、配置请求拦截器
requests.interceptors.request.use(config => {
    //config内主要是对请求头Header配置
    //比如添加token

    //开启进度条
    nprogress.start();
    return config;
})
//3、配置相应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    //响应成功，关闭进度条
    nprogress.done()
    return  res;
},(error) => {
    //失败的回调函数
    console.log("响应失败"+error)
    return Promise.reject(new Error('fail'))
})



export default function ajax(url,data={},type='GET'){

    return new Promise(function (resolve, reject){

        let promise
        //执行异步ajax请求
        if(type === 'GET'){
            //url后面拼接参数
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' +data[key] + '&'
            })

            if(dataStr !== ''){
                dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }

            promise = requests.get(url)
        }else {
            //post请求
            promise = requests.post(url,data);
        }

        //请求完成, 返回成功或失败数据
        promise.then(function (response){
            resolve(response.data)
        }).catch(function (error) {
            reject(error)
        })

    })
}
