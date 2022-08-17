import * as types from './mutations-types'


export default {
  [types.REQUESTING](state){
    state.firstView= false
    state.loading = true
    state.errorMsg=''
    state.cards=[]
  },
  [types.REQUEST_ERROR](state,{msg}){
    state.loading = false
    state.errorMsg=msg
  },
  [types.REQUEST_SUCCESS](state,{cards}){
    state.loading = false
    state.cards=cards
  },
}



