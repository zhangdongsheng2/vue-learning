/**
 * vuex 最核心管理对象 store
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * data对象的状态对象
 */
const state = {
  count: 0 //指定初始化数据
}

/*
包含了多个更新状态的方法
 */
const mutations = {
  INCREMENT(state) {
    state.count++
  },
  DECREMENT(state) {
    state.count--
  }
}

/**
 * 包含了多个间接更新状态的方法对象
 */

const actions = {
  increment({commit}) {
    //提交一个mutation请求
    commit('INCREMENT')
  },
  decrement({commit}) {
    //提交一个mutation请求
    commit('DECREMENT')
  },
  incrementIfOdd({commit, state}) {
    //条件更新
    if (state.count % 2 === 1)
      commit('INCREMENT')
  },
  incrementAsync({commit, state}) {
    //异步更新
    setTimeout(()=>{
      commit('INCREMENT')
    },1000)

  },
}

const getters = {
  eventOrOdd(state){//当读取属性时自动调用并返回属性值
    return state.count%2===0?'偶数':'奇数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
















