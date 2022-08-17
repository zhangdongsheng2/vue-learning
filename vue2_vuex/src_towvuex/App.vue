<template>
  <div >
    <p>click {{count}} times, count is {{eventOrOdd}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">incrementIfOdd</button>
    <button style="margin-bottom: 100px" @click="incrementAsync">incrementAsync</button>


    <div id="app2"></div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'

export default {
  name: 'App',
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    // evenOrOdd () {
    //   return this.$store.getters.evenOrOdd
    // }
    ...mapState(['count']),
    ...mapGetters(['eventOrOdd'])
  },
  mounted() {
    console.log(this.$store)
    console.log(mapState)
  },
  methods: {
    ...mapActions(['increment','decrement','incrementIfOdd','incrementAsync'])
  }

}
</script>

