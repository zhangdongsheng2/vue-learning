<template>
<div>

  <section class="order">
    <header-top title="订单"></header-top>
    <section class="order_no_login">
      <img src="./images/person.png">
      <h3>登录后查看外卖订单</h3>
      <button>立即登陆</button>
    </section>
  </section>
</div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import HeaderTop from '../../components/HeaderTop'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['address'])
  },
  components:{
    HeaderTop
  },
  mounted() {
    this.$store.dispatch('getAddress',{latitude:40.10038 , longitude:116.36867})
  },
  methods: {
    getAddress() {
      console.log(this.address)
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.order  //订单
  width 100%
  .order_no_login
    padding-top 140px
    width 60%
    margin 0 auto
    text-align center
    >img
      display block
      width 100%
      height 30%
    >h3
      padding 10px 0
      font-size 17px
      color #6a6a6a
    >button
      display inline-block
      background #02a774
      font-size 14px
      color #fff
      border 0
      outline none
      border-radius 5px
      padding 10px 20px
</style>
