import * as types from './mutations-types'

export  default {
  addTodo({commit},todo){
    commit(types.ADD_TODO,{todo})
  },
  deleteTodo({commit},index){
    commit(types.DELETE_TODO,{index})
  },
  selectAll({commit},isCheck){
    commit(types.SELECT_ALL_TODOS,{isCheck})
  },
  deleteCompleteTodos({commit}){
    commit(types.DELETE_COMPLETE_TODOS)
  }
}




