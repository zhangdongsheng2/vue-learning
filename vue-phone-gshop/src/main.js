import 'babel-polyfill'
import 'classlist-polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer'
import router from './router'
import VueLazyload from "vue-lazyload";
import Loading from '../src/common/imgs/loading.gif'

Vue.component(Button.name, Button)

Vue.config.productionTip = false

Vue.use(VueLazyload,{
  Loading
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


