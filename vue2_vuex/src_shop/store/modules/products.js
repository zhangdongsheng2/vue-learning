import shop from '../../api/shop'
import {RECEIVE_PRODUCTS,ADD_TO_CART} from "../types";

const state = {
  products: []
}

/*
包含了多个更新状态的方法
 */
const mutations = {
  [RECEIVE_PRODUCTS](state,{products}) {
    state.products = products
  },
  [ADD_TO_CART](state,{id}) {
    state.products.find(p=>p.id===id).inventory--
  }
}

/**
 * 包含了多个间接更新状态的方法对象
 */

const actions = {
  getProducts({commit}) {
    shop.getProducts((products => {
      commit(RECEIVE_PRODUCTS,{products})
    }))

  },
}

const getters = {
  products(state){
    return state.products
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}






















