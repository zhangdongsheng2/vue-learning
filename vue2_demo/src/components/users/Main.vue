<template>

  <div class="row">
    <h2 v-show="firstView">请输入关键字</h2>
    <h2 v-show="loading">请求中...</h2>
    <h2 v-show="errorMsg">{{errorMsg}}</h2>

    <div v-for="(item,index) in cards" :key="index" class="card">
      <a target="_blank" :href="item.url">
        <img :src="item.avatarUrl">
      </a>
      <p>{{ item.username }}</p>
    </div>
  </div>


</template>

<script>
import axios from 'axios'
import PubSub from 'pubsub-js'

export default {
  name: "Main",
  data() {
    return {
      firstView: true,
      loading: false,
      cards: [],
      errorMsg: ''
    }
  },
  mounted() {
    PubSub.subscribe('search', (msg, searchName) => {
      const url = 'https://api.github.com/search/users?q=' + searchName

      this.firstView= false
      this.loading = true
      this.errorMsg=''

      axios.get(url)
        .then(response => {
          //成功更新数据
          this.loading = false
          this.cards = response.data.items.map(it => ({
            url: it.html_url,
            avatarUrl: it.avatar_url,
            username: it.login
          }))
        })
        .catch(error => {
          //失败
          this.loading = false
          this.errorMsg = error
        })

    })

  }
}
</script>

<style scoped>
.card {
  float: left;
  width: 33.3333%;
  padding: 0.75rem;
  border: 1px solid #efefef;
  text-align: center;
}

img {
  width: 100px;
  margin: 0 auto;
}
</style>
