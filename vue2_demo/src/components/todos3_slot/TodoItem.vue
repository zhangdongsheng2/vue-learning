<template>
  <li :style="{background: bgColor}" @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)">
    <label>
      <input type="checkbox" v-model="todo.complete"> <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" @click="deleteTodo(index)">删除</button>
  </li>
</template>

<script>
import PubSub from "pubsub-js"
export default {
  name: "TodoItem",
  props: {
    todo:Object,
    index: Number
  },
  data(){
    return{
      bgColor:'#ffffff',
      isShow: true
    }
  },
  methods:{
    //动态的修改样式
    handleEnter(isEnter){
      if (isEnter) {
        this.bgColor='#cccccc'
        this.isShow = true
      }else{
        this.bgColor='#ffffff'
        this.isShow = false
      }
    },
    deleteTodo(){
      PubSub.publish('deleteTodo',this.index)
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
  padding: 0;
  border-bottom: 1px solid #ddd;
  height: 36px;
  line-height: 36px;
}

li label{
  cursor: pointer;
}

li label li input{
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button{
  float: right;
  /*!*display: none;*!*/
  margin-top: 3px;
}

li:before{
  content: initial;
}

li:last-child{
  border-bottom: none;
}



.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}
</style>
