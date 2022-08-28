//直接更新state
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RECEIVE_SEARCH_SHOPS
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
}
