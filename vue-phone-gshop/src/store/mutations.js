//直接更新state
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RECEIVE_SEARCH_SHOPS,
    RECEIVE_SHOPS_INFO,
    RECEIVE_GOODS,
    RECEIVE_FOOD_INCREASE,
    RECEIVE_FOOD_DECREASE, RECEIVE_CLEAR_CART, RECEIVE_RATINGS
} from './mutation-types'

import Vue from 'vue'

export default {
    [RECEIVE_ADDRESS](state,{address}) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state,{categorys}) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,{shops}) {
        state.shops = shops
    },
    [RECEIVE_USERINFO](state,{userInfo}) {
        state.userInfo = userInfo
    },
    [RECEIVE_SEARCH_SHOPS](state,{searchShops}) {
        state.searchShops = searchShops
    },
    [RECEIVE_SHOPS_INFO](state,{info}) {
        state.info = info
    },
    [RECEIVE_GOODS](state,{goods}) {
        state.goods = goods
    },
    [RECEIVE_FOOD_DECREASE](state,{food}) {
        food.count--
        if (!food.count) {
           state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
    },
    [RECEIVE_FOOD_INCREASE](state,{food}) {
        if(!food.count){
            Vue.set(food,'count',1)
            state.cartFoods.push(food)
        }else {
            food.count ++
        }
    },
    [RECEIVE_CLEAR_CART](state) {
        state.cartFoods.forEach(value => value.count = 0)
        state.cartFoods = []
    },
    [RECEIVE_RATINGS](state,{ratings}) {
        state.ratings = ratings
    },
}

