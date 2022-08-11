<template>
  <div class="hello">
    <h2>Home</h2>
    <div>
      <ul class="nav-tabs nav">
        <li><router-link to="/home/news">News</router-link></li>
        <li><router-link to="/home/message">Message</router-link></li>
      </ul>

      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
}
</script>
