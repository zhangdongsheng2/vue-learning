<template>
  <div>
    <ShopHeader></ShopHeader>

    <div class="tab">

      <div class="tab_item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>

    </div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from "@/components/ShopHeader";
import {mapState,mapActions} from 'vuex'

export default {
  name: "Shop",
  components: {
    ShopHeader

  },
  mounted() {
    this.$store.dispatch('getShopsInfo')
  }
}
</script>

<style lang="stylus" >
.tab{
  height 40px
  line-height 40px
  text-align center
  .tab_item{
    width 33.33333%
    float: left;
    a{
      display block
      position relative
      &.router-link-active{
        color #4cae4c
        &::after{
          margin-top -5px
          display block
          width 30px
          height 2px
          background-color #4cae4c
          content ''
          position absolute
          left 50%
          transform translateX(-50%)
        }

      }
    }

  }
}


</style>
