<template>
  <div>

    <section class="search">
      <header-top title="搜索"></header-top>
      <form class="search_form" action="#" @submit.prevent="search()">
        <input type="search" name="search" v-model="keyword" placeholder="请输入商家或美食名称" class="search_input">
        <input type="submit" name="submit" class="search_submit">
      </form>
    </section>
    <div class="msite_shop_list" v-if="searchShops.length">
      <shop-list :is-search="true"></shop-list>
    </div>
    <div class="search_no" v-else>很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import HeaderTop from '../../components/HeaderTop'
import ShopList from "@/components/ShopList/ShopList";

export default {
  name: "Search",
  data() {
    return {
      keyword: ''
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  methods: {
    search() {
      const keyword = this.keyword.trim()
      if (keyword)
        this.$store.dispatch('getSearchShops', this.keyword)
    }
  },
  computed: {
    ...mapState(['searchShops'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.search //搜索
  width 100%
  position fixed
  top 40px
  z-index 9999

  .search_form
    clearFix()
    background-color #fff
    padding 20px 8px

    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none

      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2

      &.search_submit
        float right
        width 18%
        border 4px solid #02a774
        font-size 16px
        color #fff
        background-color #02a774

.msite_shop_list
  top-border-1px(#e4e4e4)
  margin-top 100px
  overflow hidden
  padding-bottom 20px
  background #fff
  z-index -2


  .shop_header
    padding 10px 10px 0

    .shop_icon
      margin-left 5px
      color #999

    .shop_header_title
      color #999
      font-size 14px
      line-height 20px


.search_no {
  margin auto
  position fixed
  left 50%
  top 50%
  transform translate(-50%, -50%)
}
</style>
