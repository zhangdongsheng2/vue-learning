//直接更新state
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOP
} from './mutation-types'

import Vue from 'vue'

export default {
    [RECEIVE_ADDRESS](state,{address}) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state,{categorys}) {
        state.categorys = category
    },
    [RECEIVE_SHOP](state,{shops}) {
        state.shops = address
    },

}
