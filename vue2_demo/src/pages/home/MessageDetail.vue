<template>
  <ul>
    <li>id: {{$route.params.id}}</li>
    <li>title: {{detail.title}}</li>
    <li>content: {{detail.content}}</li>
  </ul>
</template>

<script>
const messageDetails=[
  {id: 1, title: 'Message001',content:'message content00111.......'},
  {id: 3, title: 'Message003',content:'message content00222.......'},
  {id: 5, title: 'Message005',content:'message content00333.......'}
]
export default {
  data () {
    return {
      detail: {}
    }
  },
  mounted() {
    //改变当前路由组件参数时, 不会重新创建, mounted 不会重新执行
    const id = this.$route.params.id
    this.detail = messageDetails.find(d => d.id === id*1)
  },
  watch: {
    $route:function () {
      console.log('route()')
      const id = this.$route.params.id
      this.detail = messageDetails.find(d => d.id === id*1)
    }
  }
}
</script>

<style scoped>

</style>
