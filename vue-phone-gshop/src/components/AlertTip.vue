<template>
<div class="alert_container">
  <div class="tip_text_container">
    <div class="tip_icon">
      <span></span>
      <span></span>
    </div>
    <p class="alert_msg">{{alertText}}</p>
    <a class="close_btn" @click.prevent="closeTip">确认</a>
  </div>
</div>
</template>

<script>
export default {
  name: "AlertTip",
  props:{
    alertText:String
  },
  methods: {
    closeTip(){
      this.$emit('closeTip')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

@keyframes tipMove{
  0%{
    transform scale(1) translate(-50%,-50%)
  }
  35%{
    transform scale(.8) translate(-50%,-50%)
  }
  75%{
    transform scale(1.2) translate(-50%,-50%)
  }
  100%{
    transform scale(1) translate(-50%,-50%)
  }
}

.alert_container{
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  width 100%
  height 100%
  z-index 200
  background rgba(0, 0, 0, .5)

  .tip_text_container{
    transform-origin: 0 0;
    animation tipMove .5s
    animation-fill-mode: both;

    width 60%
    background white
    position absolute
    top 50%
    left 50%
    border-radius 5px

    padding-top 20px
    .tip_icon{
      margin auto
      width 55px
      height 55px
      border-radius 50%
      border 2px solid #f8cb86;
      display: flex;
      flex-direction: column;
      align-items center //元素在侧轴居中
      justify-content center //留白的位置为 主轴两侧

      span:nth-of-type(1){
        border-left 2px  solid #f8cb86;
        height 20px
      }
      span:nth-of-type(2){
        border-left 2px  solid #f8cb86;
        height 2px
        margin-top 2px
      }
    }
    .alert_msg{
      text-align center
      margin 20px 0
    }
    .close_btn{
      display block
      background-color #4cae4c
      width 100%
      text-align center
      line-height 35px
      color white
      border-bottom-left-radius 5px
      border-bottom-right-radius 5px
    }
  }
}

</style>
