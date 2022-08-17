// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import {currency} from './currency.js'

Vue.config.productionTip = false

Vue.filter('currency',currency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store, //注册vuex的store, 所有组件多个属性$store
})















