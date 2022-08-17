<template>
  <div class="todo-footer">
    <input type="checkbox" v-model="checkAll">

    <span>已完成{{ completeSize }}</span> / 全部{{ totalSize }}

    <button class="btn btn-danger" v-show="completeSize" @click="deleteAllCompleted">清楚已完成</button>
  </div>
</template>

<script>

import {mapState,mapGetters,mapActions} from 'vuex'

export default {
  name: "TodoFooter",
  computed: {
    ...mapGetters(['totalSize','completeSize']),
    checkAll: {
      get() {
        //不断计算是否勾选
        return this.$store.getters.isAllSelect
      },
      set(value) {
        //点击了全部勾选, 就执行方法遍历修改集合内元素属性
        this.$store.dispatch('selectAll',value)
      }
    }
  },
  methods: {
    deleteAllCompleted() {
      if (window.confirm('确定清除吗?')) {
        this.$store.dispatch("deleteCompleteTodos")
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
