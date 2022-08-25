<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide></FooterGuide>
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
  },
}
</script>

<style>
</style>
