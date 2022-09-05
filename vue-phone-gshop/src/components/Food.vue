<template>
<div v-show="isShow" class="shop_food" @click="toggleShow()">
  <div class="header" @click.stop>
    <img class="header_image" v-lazy="food.image"/>
    <div class="back" @click.stop="toggleShow">
      <span class="iconfont icon-arrow_left"></span>
    </div>
    <p class="desc">{{ food.info }}</p>
  </div>
  <div class="content_food" @click.stop>
    <h3 class="title_food">{{ food.name }}</h3>
    <div class="orders_food">
      <span>月售{{food.sellCount}}</span>
      <span>好评率{{food.rating}}%</span>
    </div>
    <div class="price" >
      <span class="left">{{food.price}}元</span>
      <div class="right">
        <cart-control :food="food"></cart-control>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CartControl from "@/components/CartControl";
export default {
  name: "Food",
  components: {CartControl},
  props: {
    food: Object
  },
  data(){
    return {
      isShow: false
    }
  },
  methods: {
    toggleShow(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="stylus" >
@import "../common/stylus/mixins.styl"

.shop_food{
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  display flex
  justify-content center
  align-items center
  z-index 52
  flex-direction column
  color #333
  background-color rgba(0, 0, 0, .5)
  .header{
    width 80%
    height  35%
    position relative
    .header_image{
      width 100%
      height 100%
    }
    .desc{
      position absolute
      bottom  0
      left 0
      display: block
      padding: 5px
      font-size: 10px
      color: #fff
    }
    .back {
      position absolute
      top 0
      left 0
      display: block
      padding: 5px
      font-size: 20px
      color: #fff
    }
  }
  .content_food{
    padding-top 15px
    width 80%
    height  25%
    border-bottom-right-radius 3px
    border-bottom-left-radius 3px
    background-color white
    .title_food{
      color black
      font-size 14px
      font-weight: 700;
      margin-left: 15px;
      margin-bottom 5px
    }
    .orders_food{
      margin-left 15px
      margin-bottom 25px
      span:nth-of-type(1){
        font-size: 10px
        color: #93999f
        margin-right 15px
      }
      span:nth-of-type(2){
        font-size: 10px
        color: #93999f
      }
    }
    .price{
      width 100%
      clearFix()
      block-size border

      .left{
        color #f01414
        float left
        padding-left 15px
      }
      .right{
        color #02a774
        float right
        padding-right 15px
      }
    }
  }
}

</style>

