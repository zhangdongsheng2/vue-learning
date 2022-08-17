<template>
  <ul class="todo-list">
    <TodoItem v-for="(todo,index) in todos" :key="index" :todo="todo"  :index="index"></TodoItem>
  </ul>
</template>

<script>
import TodoItem from "./TodoItem";

import {mapState,mapGetters,mapActions} from 'vuex'
import storageUtils from "../utils/storageUtils";

export default {
  name: "TodoList",
  computed:{
    ...mapState(['todos'])
  },
  watch:{
    todos:{
      deep:true,
      handler: storageUtils.saveTodos
    }
  },
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
