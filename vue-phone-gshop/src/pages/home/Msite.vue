<template>
  <section class="msite">
    <header-top :title="address.name">
      <template v-slot:left>
            <span class="header_search" @click="$router.replace('/search')" >
                   <i class="iconfont icon-sousuo"></i>
            </span>
      </template>
      <template v-slot:right>
        <router-link :to="userInfo._id?'/userinfo':'/login'">
             <span v-if="!userInfo._id" class="header_login">
                  <span class="header_login_text">登录|注册</span>
            </span>
            <span v-else class="header_login">
                  <span class="iconfont icon-person"></span>
            </span>
        </router-link>

      </template>
    </header-top>
    <!--首页导航-->
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in categoryArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category,index) in item" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" v-else alt="">
        </nav>

        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <shop-list></shop-list>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import Swiper from 'swiper'
import BScroll from 'better-scroll'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop'
import {mapState,mapActions} from 'vuex'
import ShopList from "@/components/ShopList/ShopList";

import {throttle} from 'lodash'


export default {
  name: "Msite",
  data(){
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted() {
    this.$store.dispatch('getFoodCategorys')
    this.$store.dispatch('getShops')

  },
  methods:{
    //采用键值对形式创建函数，将changeIndex定义为节流函数，该函数触发很频繁时，设置50ms才会执行一次
    changeIndex: throttle(function (index){
      this.currentIndex = index
    },50),
  },
  computed: {
    ...mapState(['shops','categorys','address',"userInfo"]),
    categoryArr(){
      const {categorys} = this
      const arr1 = categorys.filter((value, index)=>index < 8)
      const arr2 = categorys.filter((value, index)=>index >= 8)
      return [arr1,arr2]
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  watch: {
    categorys(value){
      this.$nextTick(()=>{
        //swiper
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
        new BScroll('.miste-content-wrapper',{
          click: true
        })


      })

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.msite //首页
  width 100%
  .miste-content-wrapper
    position fixed
    top 45px
    bottom 46px
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff

      .swiper-container
        width 100%
        height 100%

        .swiper-wrapper
          width 100%
          height 100%

          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap

            .link_to_food
              width 25%

              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0

                img
                  display inline-block
                  width 50px
                  height 50px

              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774

    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      padding-bottom 20px
      background #fff

      .shop_header
        padding 10px 10px 0

        .shop_icon
          margin-left 5px
          color #999

        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
