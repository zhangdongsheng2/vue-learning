<template>
<div>
  <header-top title="订单"></header-top>
  <br/><br/><br/><br/><br/><br/><br/><br/>
  <button @click="getAddress()">查询地址</button>
  <h1>{{address}}</h1>
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

<style scoped>

</style>
