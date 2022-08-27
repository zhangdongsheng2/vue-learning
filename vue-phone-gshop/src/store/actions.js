import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS, RECEIVE_USERINFO
} from './mutation-types'

import {
    reqAddress,
    reqFoodCategorys,
    reqShops
} from '@/api'


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
    },
    async getFoodCategorys({commit}){
        const result = await reqFoodCategorys()
        if(result.code === 0){
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,{categorys})
        }
    },
    async getShops({commit,state}){
        const {latitude,longitude} = state
        const result = await reqShops(longitude,latitude)
        if(result.code === 0){
            const shops = result.data
            commit(RECEIVE_SHOPS,{shops})
        }
    },
    recordUser({commit},userInfo){
        commit(RECEIVE_USERINFO,{userInfo})
    }

}
