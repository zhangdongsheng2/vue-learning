<template>
  <ul class="todo-list">
    <TodoItem v-for="(todo,index) in todos" :key="index" :todo="todo" :deleteTodo="deleteTodo" :index="index"></TodoItem>
  </ul>
</template>

<script>
import TodoItem from "./TodoItem";
export default {
  name: "TodoList",
  //声明接收标签属性
  //会成为当前组件对象的属性, 可以在模板中直接访问, 也可以通过this访问
  props: ['todos','deleteTodo'],
  components: {
    TodoItem
  }
}
</script>

<style scoped>
.todo-list {
  width: 500px;
  border-radius: 2px;
  border: 1px solid #ddd;
  padding: 0 10px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}



</style>
