<template>
  <div class="search-content">
    <h3>Search Github Users</h3>
    <div>
      <input v-model="searchName" type="text">
      <button @click="searchBtn">Search</button>
    </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
import {mapState,mapGetters,mapActions} from 'vuex'

export default {
  name: "Search",
  data(){
    return {
      searchName: ''
    }
  },
  methods:{
    searchBtn(){
      this.$store.dispatch('search',this.searchName.trim())
    }
  }
}
</script>

<style scoped>
.search-content{
  padding-top: 48px;
  padding-bottom: 48px;
  background-color: #eee;
  color: inherit;
  padding-left: 15px;
  margin-bottom: 30px;
}
</style>
