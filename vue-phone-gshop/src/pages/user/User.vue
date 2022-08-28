<template>
  <div>
    <HeaderTop title="个人信息">
      <a slot="left" class="back " @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
    </HeaderTop>

    <div style="padding-top: 50px ; margin: auto; text-align: center">用户: {{ userInfo.name }}</div>
    <label id="label_inline">内联元素: 不能设置高度等.</label>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import HeaderTop from '../../components/HeaderTop'

export default {
  name: 'Users',
  components: {
    HeaderTop
  },
  computed: {
    ...mapState(['userInfo', 'info'])
  },
}
</script>

<style lang="stylus">
#label_inline
  margin 10px
  height 10px
  display block
.back
  position: absolute
  top: 10px
  left: 0

  .icon-arrow_left
    display: block
    padding: 5px
    font-size: 20px
    color: #fff

</style>
