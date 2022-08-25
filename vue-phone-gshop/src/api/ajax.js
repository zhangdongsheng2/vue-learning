
import axios from 'axios'
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

            promise = axios.get(url)
        }else {
            //post请求
            promise = axios.post(url,data);
        }

        //请求完成, 返回成功或失败数据
        promise.then(function (response){
            resolve(response.data)
        }).catch(function (error) {
            reject(error)
        })

    })
}
