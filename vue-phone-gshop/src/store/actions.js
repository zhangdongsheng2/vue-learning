import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS, RECEIVE_GOODS, RECEIVE_SEARCH_SHOPS,
    RECEIVE_SHOPS, RECEIVE_SHOPS_INFO, RECEIVE_USERINFO
} from './mutation-types'

import {
    reqAddress,
    reqFoodCategorys, reqLogout,
    reqShops,
    reqUserInfo,
    reqSearchShops,
    reqShopsInfo,
    reqGoods
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
    async getSearchShops({commit,state},keyword){
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShops(geohash,keyword)
        if(result.code === 0){
            const searchShops = result.data
            commit(RECEIVE_SEARCH_SHOPS,{searchShops})
        }
    },
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code === 0){
            const userInfo = result.data
            commit(RECEIVE_USERINFO,{userInfo})
        }
    },
    async getLogout({commit}){
        const result = await reqLogout()
        if(result.code === 0){
            commit(RECEIVE_USERINFO,{userInfo:{}})
        }
    },
    async getShopsInfo({commit}){
        const result = await reqShopsInfo()
        if(result.code === 0){
            const info = result.data
            commit(RECEIVE_SHOPS_INFO,{info})
        }
    },
    async getGoods({commit},callback){
        const result = await reqGoods()
        if(result.code === 0){
            const goods = result.data
            commit(RECEIVE_GOODS,{goods})
            callback && callback()
        }
    },
    recordUser({commit},userInfo){
        commit(RECEIVE_USERINFO,{userInfo})
    }

}
