import 'babel-polyfill'
import 'classlist-polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer'
import router from './router'
import VueLazyload from "vue-lazyload";
import loading from '../src/common/imgs/loading.gif'
import './fiters'

//将三级联动组件注册为全局组件
import Star from '@/components/Star/Star';
//第一个参数：全局组件名字，第二个参数：全局组件
Vue.component(Star.name,Star);

Vue.component(Button.name, Button)

Vue.config.productionTip = false

Vue.use(VueLazyload,{
  loading
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


