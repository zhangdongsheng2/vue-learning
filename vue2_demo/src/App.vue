<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png" alt="logo">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
.logo{
  width: 100px;
  height: 100px;
  text-align: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased; /*抗锯齿*/
  -moz-osx-font-smoothing: grayscale; /*抗锯齿*/
  text-align: center;
  margin-top: 60px;
}
</style>
