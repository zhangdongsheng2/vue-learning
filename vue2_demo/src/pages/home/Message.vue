<template>
  <ul>
    <li v-for="m in messages" :key="m.id">
      <router-link :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
      <button @click="pushShow(m.id)">push查看</button>
      <button @click="replaceShow(m.id)">replace查看</button>
    </li>
    <button @click="$router.back()"> 回退</button>
    <hr>
    <router-view></router-view>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        // {id: 1, title: 'Message001'},
        // {id: 3, title: 'Message003'},
        // {id: 5, title: 'Message005'}
      ]
    }
  },
  mounted() {
    setTimeout(()=>{
      this.messages = [
        {id: 1, title: 'Message001'},
        {id: 3, title: 'Message003'},
        {id: 5, title: 'Message005'}
      ]
    },1000)
  },
  methods: {
    pushShow(id){
      this.$router.push(`/home/message/detail/${id}`)
    },
    replaceShow(id){
      this.$router.replace(`/home/message/detail/${id}`)
    }
  }
}
</script>

<style scoped>
</style>
