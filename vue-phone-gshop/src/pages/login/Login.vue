<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}" >
            <section class="login_message">
              <input type="tel" maxlength="11" v-model="username" placeholder="手机号">
              <button ref="textCode" class="get_verification right_phone" @click="getCode()">获取验证码</button>

            </section>
            <section class="login_verification">
              <input type="tel" v-model="code"  maxlength="8" placeholder="验证码">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}" >
            <section>
              <section class="login_message">
                <input type="tel" v-model="username" maxlength="11" placeholder="手机/邮箱/用户名">
              </section>
              <section class="login_verification">
                <input type="tel" v-model="password" maxlength="8" placeholder="密码">
                <div class="switch_button off">
                  <div class="switch_circle"></div>
                  <span class="switch_text">...</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" v-model="captcha" maxlength="11" placeholder="验证码">
                <img class="get_verification" src="http://127.0.0.1:9373/api/captcha" @click="captchaGet()" ref="captcha" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login()">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

    <AlertTip v-show="alertShow" :alertText="alertText" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
import {reqSendCode, reqSmsLogin, reqPwdLogin} from '@/api'
import AlertTip from "@/components/AlertTip";

export default {
  name: "Login",
  data(){
    return {
      loginWay: true, //true 代表短信登陆, false代表密码登陆.
      username: '17717812656',
      password: '123456',
      captcha: '',
      code: '',
      computeTime: '',
      showPwd: false,
      alertText: '',
      alertShow: false,
    }
  },
  components:{
    AlertTip
  },
  methods: {
    async login(){
      if (this.loginWay) {
        if (!this.username) {
          this.showAlert('手机号必须输入')
        }else if (!/^\d{6}$/.test(this.code)) {
          this.showAlert('验证码必须为六位数字')
        }
        const result = await reqSmsLogin(this.username,this.code);
        if(result.code === 0){
          const userInfo = result.data
          await this.$store.dispatch('recordUser', userInfo)
          await this.$router.replace('/profile')
        }else {
          this.showAlert(result.msg)
        }
      }else {
        if (!this.username) {
          this.showAlert('用户名必须输入')
        }else if (!this.password) {
          this.showAlert('password必须输入')
        }else if (!this.captcha) {
          this.showAlert('验证码必须输入')
        }

        const result = await reqPwdLogin(this.username,this.password,this.captcha);
        if(result.code === 0){
          const userInfo = result.data
          await this.$store.dispatch('recordUser', userInfo)
          await this.$router.replace('/profile')
        }else {
          this.showAlert(result.msg)
        }
      }

    },
    captchaGet(){
      this.$refs.captcha.src = 'http://127.0.0.1:9373/api/captcha?time='+new Date().getTime()
    },
    async getCode(){
      if (this.num) {
        return
      }

      const result = await reqSendCode(this.username)
      if(result.code === 0){
        this.num = 30;
        const interNum = setInterval(()=>{
          this.num --
          this.$refs.textCode.innerHTML=this.num + '秒'
          if (!this.num) {
            this.$refs.textCode.innerHTML='获取验证码'
            clearInterval(interNum)
          }
        },1000)

      }else {
        this.showAlert(result.msg)
      }
    },
    closeTip(){
      this.alertShow = false
    },
    showAlert(msg){
      this.alertShow = true
      this.alertText = msg
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
