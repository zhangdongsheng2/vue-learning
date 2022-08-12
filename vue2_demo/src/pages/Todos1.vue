<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"></TodoHeader>
      <todo-list :todos="todos" :deleteTodo="deleteTodo"></todo-list>
      <todo-footer :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAll="selectAll"></todo-footer>
    </div>
  </div>
</template>

<script>
import TodoHeader from "../components/todos1/TodoHeader";
import TodoList from "../components/todos1/TodoList";
import TodoFooter from "../components/todos1/TodoFooter";
import storageUtils from "../utils/storageUtils";

export default {
  name: "Todos1",
  data(){
    return {
      todos: storageUtils.readTodos()
    }
  },
  methods: {
    addTodo(todo){
      this.todos.unshift(todo)
    },
    deleteTodo(index){
      this.todos.splice(index,1)
    },
    //删除所有已完成
    deleteCompleteTodos(){
      this.todos = this.todos.filter(todo => !todo.complete)
    },
    //全选/全不选
    selectAll(isSelectAll){
      this.todos.forEach(todo=>{
        todo.complete = isSelectAll
      })
    }
  },
  watch:{
    todos:{
      deep:true,
      //handler 的值是一个函数, 且函数应该有个形参接收 todos最新值,  函数简写如下:
      handler: storageUtils.saveTodos,
      // handler: function (val) {
      //   //将数据 json 保存到 localStorage
      //   storageUtils.saveTodos(val)
      // }
    }
  },
  components: {
    TodoHeader,
    TodoList,
    TodoFooter
  }
}
</script>

<style scoped>
.todo-container{
  width: 600px;
  margin: 0 auto;
}
.todo-wrap, .todo-container{
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}


</style>
