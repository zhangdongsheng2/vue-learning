import 'babel-polyfill'
import 'classlist-polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {Button} from 'mint-ui'

import router from './router'

Vue.component(Button.name, Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
