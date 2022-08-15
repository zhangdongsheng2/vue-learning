<template>
  <div class="todo-header">
    <input v-model="inputTodo" @keyup.enter="add" placeholder="请输入你的任务名称, 按回车键确认" type="text">
  </div>
</template>

<script>
export default {
  name: "TodoHeader",
  props: {
    addTodo: {
      type:Function,
      required: true
    }
  },
  data(){
    return {
      inputTodo: ''
    }
  },
  methods:{
    add(){
      //获取数据
      const inputTodo = this.inputTodo.trim();
      if (!inputTodo) {
        alert('必须输入')
        return
      }
      const todo = {
        title: inputTodo,
        complete: false
      }
      //调用主页面传的方法, 加入元素
      this.addTodo(todo)
      this.inputTodo=''
    }
  }
}
</script>

<style scoped>
.todo-header input{
  width: 500px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 13px;
  padding: 0 10px;
}

.todo-header input:focus{
  /*去掉边框*/
  outline: none;
  border-color: rgba(82,168,236,.8);
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,.6);
}
</style>
