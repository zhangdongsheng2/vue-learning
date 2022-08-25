import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOP
} from './mutation-types'

import {
    reqAddress
} from '../api'


export default {
    //异步获取地址
    async getAddress({commit,state}){
        const geohash = state.latitude +','+state.longitude
        // const geohash = '40.10038,116.36867'
        //调用异步 ajax 请求
        const result = await reqAddress(geohash)
        if(result.code === 0){
            const address = result.data
            commit(RECEIVE_ADDRESS,{address})
        }
    }



}
