import shop from '../../api/shop'
import {CHECKOUT_SUCCESS,CHECKOUT_FAILURE,CHECKOUT_REQ,ADD_TO_CART} from "../types";

const state = {
  items:[],
  checkoutStatus: null
}

/*
包含了多个更新状态的方法
 */
const mutations = {
  [ADD_TO_CART](state,{id}) {
    const item = state.items.find(item=> item.id===id)
    if (item) {
      item.count ++
    }else{
      state.items.unshift({
        id,
        count:1
      })
    }
  },
  [CHECKOUT_REQ](state) {
    state.items=[]
    state.checkoutStatus=null
  },
  [CHECKOUT_FAILURE](state) {
    state.checkoutStatus="提交成功"
  },
  [CHECKOUT_SUCCESS](state,{items}) {
    this.state.items = items
    state.checkoutStatus="提交失败"
  }
}

/**
 * 包含了多个间接更新状态的方法对象
 */

const actions = {
  checkout({commit},cartProducts) {
    const items = [...state.items]
    commit(CHECKOUT_REQ)
    shop.buyProducts(cartProducts,()=>commit(CHECKOUT_SUCCESS),()=>commit(CHECKOUT_FAILURE))
  },
}

const getters = {
  checkoutStatus(state){
    return state.checkoutStatus
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}






















