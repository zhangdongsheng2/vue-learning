<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-if="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide.vue'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted() {
    this.$store.dispatch('getAddress',{latitude:40.10038 , longitude:116.36867})
    this.$store.dispatch('getUserInfo')
  },
  /**
   * 1. 验证码登陆api.
   * 2. 首页商家数据完善, 星星组件.
   * 3. 我的页面完善, 退出登陆按钮.
   * 4. 订单页面, 搜索页面.
   * 5. 商家详情页面, 点餐, 评价, 商家.
   * 6. 购物车.
   */
}
</script>

<style>
</style>
