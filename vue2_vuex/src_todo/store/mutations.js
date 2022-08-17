import * as types from './mutations-types'


export default {
  [types.ADD_TODO](state,{todo}){
    state.todos.unshift(todo)
  },
  [types.DELETE_TODO](state,{index}){
    state.todos.splice(index,1)
  },
  [types.SELECT_ALL_TODOS](state,{isCheck}){
    state.todos.forEach(todo=>todo.complete=isCheck)
  },
  [types.DELETE_COMPLETE_TODOS](state){
    state.todos = state.todos.filter(todo=>!todo.complete)
  },
}



