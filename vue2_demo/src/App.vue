<template>
  <div id="app">
    <div>
     <ul class="nav nav-tabs" v-show="true"> <!-- 暂时不显示路由导航 -->
       <li v-for="(r,index) in routerList" :key="index">
         <router-link :to="r.path">{{r.name}}</router-link>
       </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import router from "./router";

export default {
  name: 'App',
  computed: {
    routerList(){
      return router.getRoutes();
    }
  },
  mounted() {
    console.log( typeof  router.getRoutes())
  }
}
</script>

