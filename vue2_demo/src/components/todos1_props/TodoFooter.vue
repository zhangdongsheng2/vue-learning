<template>
  <div class="todo-footer">
    <input type="checkbox" v-model="checkAll">

    <span>已完成{{ completeSize }}</span> / 全部{{ todos.length }}

    <button class="btn btn-danger" v-show="completeSize" @click="deleteAllCompleted">清楚已完成</button>
  </div>
</template>

<script>
export default {
  name: "TodoFooter",
  props: {
    todos: Array,
    deleteCompleteTodos: Function,
    selectAll: Function
  },
  computed: {
    completeSize() {
      return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete ? 1 : 0), 0)
    },
    checkAll: {
      get() {
        //不断计算是否勾选
        return this.completeSize === this.todos.length && this.completeSize > 0
      },
      set(value) {
        //点击了全部勾选, 就执行方法遍历修改集合内元素属性
        this.selectAll(value)
      }
    }
  },
  methods: {
    deleteAllCompleted() {
      if (window.confirm('确定清除吗?')) {
        this.deleteCompleteTodos()
      }
    }
  }
}
</script>

<style scoped>
.todo-footer {
  padding-left: 13px;
}

.btn-danger {
  float: right;
  width: 100px;
  text-align: center;
  height: 25px;
  padding: 0;
}
</style>
