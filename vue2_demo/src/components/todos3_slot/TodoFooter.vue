<template>
  <div class="todo-footer">
    <label>
      <slot name="checkAll"></slot>
    </label>

    <label>
      <slot name="size"></slot>
    </label>


    <slot name="delete"></slot>

  </div>
</template>

<script>
export default {
  name: "TodoFooter",
}
</script>

<style scoped>
.todo-footer button {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
  float: right;
  width: 100px;
  text-align: center;
  height: 25px;
  padding: 0;
}
</style>
