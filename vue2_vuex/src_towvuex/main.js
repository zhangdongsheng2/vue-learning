// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import App2 from './App2'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store, //注册vuex的store, 所有组件多个属性$store
})


new Vue({
  el: '#app2',
  components: { App2 },
  template: '<App2/>',
  store, //注册vuex的store, 所有组件多个属性$store
})














