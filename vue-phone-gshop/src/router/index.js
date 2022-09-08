/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 声明使用插件
Vue.use(VueRouter)
//引入store
import store from "@/store";

//=========处理多次push问题
/*
1. 先把VueRouter.prototype 原型上的push|replace方法保存一份
2. 重写 VueRouter 原型的 push|replace方法
 */
let orgPush = VueRouter.prototype.push;
let orgReplace = VueRouter.prototype.replace;

//重写方法
VueRouter.prototype.push = function (location,resolve,reject){
    //参数1: 路由跳转的配置对象 (query|params)
    //参数2: undefined|箭头函数 成功的回调
    //参数3: undefined|箭头函数 失败的回调

    if(resolve && reject){
        //如果参数2,3有值 就直接用原来函数
        orgPush.call(this,location,resolve,reject)
    }else {
        //如果没值就 赋值空函数 调用
        orgPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function (location,resolve,reject){
    //参数1: 路由跳转的配置对象 (query|params)
    //参数2: undefined|箭头函数 成功的回调
    //参数3: undefined|箭头函数 失败的回调

    if(resolve && reject){
        //如果参数2,3有值 就直接用原来函数
        orgReplace.call(this,location,resolve,reject)
    }else {
        //如果没值就 赋值空函数 调用
        orgReplace.call(this,location,()=>{},()=>{})
    }
}

let router = new VueRouter({
    routes,
    //跳转路由后, 让滚动条滚动到顶部
    scrollBehavior(to,from,savedPosition){
        return {y:0}
    }
})


//全局守卫: 前置首位 (在路由跳转之间进行判断)
router.beforeEach(async (to,from,next) => {
    //next: next() 放行  next(path) 放行



    let userId = store.state.userInfo._id
    console.log(userId,store.state.userInfo.name,to.path)
    console.log('aaa',userId)
    // next()

    if(userId){
        if(to.path === 'login'){
            next('/')
        }else if(store.state.userInfo.name){
            next()
        }else {
            try {
                await store.dispatch('getUserInfo')
                next();
            } catch (e) {
                //无法获取用户信息
                await store.dispatch('getLogout')
                next('/login')
            }
        }
    }else {
        //未登录: 不能去订单
        if(to.path.indexOf('/order') !== -1){
            console.log('login======order=================')
            next('/login?redirect='+to.path)
        }else {
            next()
        }
    }

})









export default router




