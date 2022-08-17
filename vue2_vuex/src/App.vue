<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader ></TodoHeader>
      <todo-list ></todo-list>
      <todo-footer ></todo-footer>
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

export default {
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
