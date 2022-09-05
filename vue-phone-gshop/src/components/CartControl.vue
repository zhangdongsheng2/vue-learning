<template>
<div class="cart_control">
  <transition name="move">
    <div v-if= "food.count" class="iconfont icon-remove_circle_outline" @click.stop="changeCount(false)"></div>
  </transition>
  <div v-if="food.count" class="cart_num">{{food.count}}</div>
  <div>
    <span class="iconfont icon-add_circle" @click.stop="changeCount(true)"></span>
  </div>
</div>
</template>

<script>
/*
1. 加号样式.
2. 有数字后加号渲染.
3. 点击后, 渲染数字修改, 并把数据累加到 vuex
4.
 */

export default {
  name: "CartControl",
  props:{
    food: Object
  },
  methods:{
    changeCount(isAdd){
      this.$store.dispatch('updateFoodCount',{isAdd,food: this.food})
    }
  }
}
</script>

<style lang="stylus">
.cart_control{
  display flex

  .iconfont{
    font-size 24px
    line-height 24px
    color #02a774

  }

  .icon-remove_circle_outline{
    /*指定过渡样式*/
    &.move-enter-active{
      transition: all .5s;
      opacity 0
      transform translateX(39px)
    }
    &.move-leave-active{
      transition: all .5s;
      opacity 1
      transform translateX(39px)
    }
    &.move-enter-to{
      opacity 1
      transform: translateX(0px) rotate(-180deg) ;
    }
    &.move-leave-to{
      opacity 0
      transform: translateX(30px) rotate(180deg) ;
    }
  }


  .cart_num{
    text-align center
    width 15px
    font-size 10px
    line-height 24px
    color #93999f
  }
}



</style>
