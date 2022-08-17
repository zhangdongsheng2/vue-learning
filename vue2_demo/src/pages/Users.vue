<template>
  <div class="container">
    <Search/>
    <Main/>
  </div>
</template>

<script>
import Main from "../components/users/Main";
import Search from "../components/users/Search";

export default {
  name: "Users",
  components: {
    Main,
    Search,
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
